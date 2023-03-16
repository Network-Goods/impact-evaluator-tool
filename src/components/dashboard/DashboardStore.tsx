import { create } from "zustand";
import { Evaluation, rpc, DashboardEvaluation } from "src/lib";

export interface DashboardStore {
  fetching: boolean;
  error?: any;
  evaluations: DashboardEvaluation[];
  load: () => void;
  createEvaluation: () => Promise<Evaluation | Error>;
}

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
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

  createEvaluation: async (): Promise<Evaluation | Error> => {
    const newEvaluation: Evaluation = {
      ...Evaluation.init(),
    };

    const res = await rpc.call("createEvaluation", {
      evaluation: newEvaluation,
    });

    if (res instanceof Error) {
      return res;
    }
    return newEvaluation;
  },
}));
