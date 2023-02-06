import { create } from "zustand";
import { Evaluation, rpc, DashboardEvaluation } from "src/lib";

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
    rpc.call("getAllEvaluations", null).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call getUserEvaluations failed`, data);
        return;
      }

      console.log("data", data);

      set({
        fetching: false,
        evaluations: data,
      });
    });
  },
}));
