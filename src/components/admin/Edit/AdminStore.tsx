import create from "zustand";
import { Evaluation, rpc, DashboardEvaluation } from "src/lib";

export interface AdminStore {
  fetching: boolean;
  error?: any;
  evaluations: DashboardEvaluation[];
  load: () => void;
  createEvaluation: () => Promise<DashboardEvaluation | Error>;
}

export const useAdminStore = create<AdminStore>()((set, get) => ({
  fetching: true,
  evaluations: [],

  load: async () => {
    rpc.call("getDashboardStore", null).then((data) => {
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

  createEvaluation: async (): Promise<DashboardEvaluation | Error> => {
    const newEvaluation: DashboardEvaluation = {
      ...Evaluation.init(),
      is_submitted: false,
    };

    set({
      evaluations: [...get().evaluations, newEvaluation],
    });

    const res = await rpc.call("createEvaluation", {
      evaluation: newEvaluation,
    });

    if (res instanceof Error) {
      return res;
    }

    return newEvaluation;
  },
}));
