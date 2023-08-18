import { create } from "zustand";
import { rpc } from "src/lib";
import { trpc } from "src/lib/trpc";

export interface AdminStore {
  fetching: boolean;
  error?: any;
  evaluations: any;
  load: () => void;
}

export const useAdminStore = create<AdminStore>()((set) => ({
  fetching: true,
  evaluations: [],

  load: async () => {
    trpc()
      .admin.getAllEvaluations.query()
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call getUserEvaluations failed`, data);
          return;
        }
        set({
          fetching: false,
          evaluations: data,
        });
      });
  },
}));
