import type { StaffUser } from "../context/StaffContext";

const SESSION_KEY = "staff_session";
const SESSION_EVENT = "staff:session-changed";

export interface StaffSession {
  userId: string;
  email: string;
  name: string;
  role: "staff" | "admin";
  team: "ops" | "support" | "finance" | "marketing";
  permissions: string[];
  scopes: string[];
  token: string;
}

function notifyStaffSessionChange() {
  window.dispatchEvent(new Event(SESSION_EVENT));
}

export function getStaffSession(): StaffSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as StaffSession;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function setStaffSession(session: StaffSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  notifyStaffSessionChange();
}

export function clearStaffSession() {
  localStorage.removeItem(SESSION_KEY);
  notifyStaffSessionChange();
}

export function subscribeStaffSession(listener: () => void) {
  const handleChange = () => listener();

  window.addEventListener(SESSION_EVENT, handleChange);
  window.addEventListener("storage", handleChange);

  return () => {
    window.removeEventListener(SESSION_EVENT, handleChange);
    window.removeEventListener("storage", handleChange);
  };
}
