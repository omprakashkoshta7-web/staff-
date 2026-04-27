import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import staffService from "../services/staff.service";
import { logoutFirebase } from "../services/firebase-auth";
import {
  getStaffSession,
  clearStaffSession,
  subscribeStaffSession,
  type StaffSession,
} from "../services/session";

type StaffRole = "ops" | "support" | "finance" | "marketing";

export interface StaffUser {
  id: string;
  email: string;
  name: string;
  role: "staff" | "admin";
  team: StaffRole;
  permissions: string[];
  scopes: string[];
}

interface StaffContextType {
  role: StaffRole;
  setRole: (r: StaffRole) => void;
  user: StaffUser | null;
  setUser: (u: StaffUser | null) => void;
  isAuthenticated: boolean;
  isLoading: boolean;
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => Promise<void>;
}

const StaffContext = createContext<StaffContextType>({
  role: "ops",
  setRole: () => {},
  user: null,
  setUser: () => {},
  isAuthenticated: false,
  isLoading: false,
  token: null,
  setToken: () => {},
  logout: async () => {},
});

export function StaffProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<StaffSession | null>(() => getStaffSession());

  useEffect(() => {
    setSession(getStaffSession());

    return subscribeStaffSession(() => {
      setSession(getStaffSession());
    });
  }, []);

  useEffect(() => {
    if (session?.token) {
      staffService.setToken(session.token);
    } else {
      staffService.clearToken();
    }
  }, [session?.token]);

  const logout = async () => {
    clearStaffSession();
    staffService.clearToken();
    await logoutFirebase();
  };

  const isAuthenticated = Boolean(session?.token);
  const user: StaffUser | null = session
    ? {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role,
        team: session.team,
        permissions: session.permissions,
        scopes: session.scopes,
      }
    : null;

  return (
    <StaffContext.Provider
      value={{
        role: session?.team || "ops",
        setRole: () => {},
        user,
        setUser: () => {},
        isAuthenticated,
        isLoading: false,
        token: session?.token || null,
        setToken: () => {},
        logout,
      }}
    >
      {children}
    </StaffContext.Provider>
  );
}

export function useStaffRole() {
  return useContext(StaffContext);
}
