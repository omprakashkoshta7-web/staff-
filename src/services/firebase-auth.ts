import {
  signInWithEmailAndPassword,
  signOut,
  type AuthError,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../config/firebase";
import STAFF_API_CONFIG from "../config/api.config";

export type StaffTeam = "ops" | "support" | "finance" | "marketing";

type VerifyUser = {
  _id: string;
  firebaseUid?: string;
  email: string;
  name?: string;
  role: "staff" | "admin" | string;
  staffProfile?: {
    team?: StaffTeam;
    permissions?: string[];
    scopes?: string[];
  };
};

type VerifyResponse = {
  user?: VerifyUser;
  token?: string;
  data?: {
    user?: VerifyUser;
    token?: string;
  };
  message?: string;
};

export interface StaffAuthUser {
  uid: string;
  email: string;
  displayName?: string;
  role: "staff" | "admin";
  team: StaffTeam;
  permissions: string[];
  scopes: string[];
}

const mapStaffUser = (user: VerifyUser, fallbackTeam: StaffTeam): StaffAuthUser => ({
  uid: user.firebaseUid || user._id,
  email: user.email || "",
  displayName: user.name || undefined,
  role: user.role === "admin" ? "admin" : "staff",
  team: user.staffProfile?.team || fallbackTeam,
  permissions: user.staffProfile?.permissions || [],
  scopes: user.staffProfile?.scopes || [],
});

const verifyStaffAccess = async (idToken: string): Promise<{ user: VerifyUser; token: string }> => {
  const response = await fetch(`${STAFF_API_CONFIG.BASE_URL}${STAFF_API_CONFIG.ENDPOINTS.AUTH.VERIFY}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idToken, role: "staff" }),
  });

  const payload = (await response.json().catch(() => ({}))) as VerifyResponse;
  const data = payload.data || payload;

  if (!response.ok) {
    throw new Error(payload.message || "Staff login failed");
  }

  if (!data.token || !data.user) {
    throw new Error("Staff session token was not returned by the server");
  }

  if (data.user.role !== "staff" && data.user.role !== "admin") {
    throw new Error("This Firebase account is not approved for staff access");
  }

  return { user: data.user, token: data.token };
};

export const loginWithFirebase = async (
  email: string,
  password: string,
  fallbackTeam: StaffTeam
): Promise<{ user: StaffAuthUser; token: string }> => {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase login is not configured for this staff app");
  }

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const idToken = await userCredential.user.getIdToken();
    const { user, token } = await verifyStaffAccess(idToken);

    return { user: mapStaffUser(user, fallbackTeam), token };
  } catch (error) {
    const authError = error as AuthError & { message?: string };

    if (authError.code === "auth/invalid-credential") {
      throw new Error("Firebase rejected these credentials. Check the staff account in Firebase and try again.");
    }

    throw new Error(authError.message || "Staff login failed");
  }
};

export const logoutFirebase = async (): Promise<void> => {
  await signOut(auth);
};
