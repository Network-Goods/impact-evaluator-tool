import create from "zustand";
import { rpc, UserProfile } from "../lib";

export type UserProfileStore = {
  profile?: UserProfile;
  login: () => void;
  logout: () => void;
  isAdmin: () => boolean;
};

export const useUserProfileStore = create<UserProfileStore>()((set, get) => ({
  login: () => {
    rpc.call("getUserProfile", null).then((profile) => {
      if (profile instanceof Error) {
        console.error(`ERROR -- rpc call getUserProfile failed.`, profile);
        return;
      }

      if (!profile) {
        return;
      }

      set({
        profile: profile,
      });
    });
  },
  logout: () => {
    set({
      profile: undefined,
    });
  },
  isAdmin: () => {
    return get().profile?.role == "admin" ? true : false;
  },
}));
