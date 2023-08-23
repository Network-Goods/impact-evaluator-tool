import { create } from "zustand";
import { rpc } from "../lib";
import { user } from "@prisma/client";
import { trpc } from "../lib/trpc";

export type UserProfileStore = {
  profile?: user;
  login: () => void;
  logout: () => void;
  isAdmin: () => boolean;
};

export const useUserProfileStore = create<UserProfileStore>()((set, get) => ({
  login: () => {
    trpc()
      .user.getUserProfile.query()
      .then((profile) => {
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
