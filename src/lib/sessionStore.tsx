import create from "zustand";
import { Session } from "@supabase/auth-helpers-react";

export interface SessionStore {
  session: Session | null;
  setSession: (session: Session | null) => void;
}

export const useSessionStore = create<SessionStore>()((set, get) => ({
  session: null,
  setSession: (session: Session | null): void => {
    set({
      session: session,
    });
  },
}));
