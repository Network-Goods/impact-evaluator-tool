import create from "zustand";
import { Evaluation, rpc } from "src/lib";

export interface DashboardStore {
  fetching: boolean;
  error?: any;
  evaluations: Evaluation[];
  load: () => void;
  createEvaluation: () => Promise<Evaluation | Error>;
}

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  fetching: true,
  evaluations: [],

  load: async () => {
    rpc.call("getUserEvaluations", null).then((data) => {
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
    const newEvaluation = Evaluation.init();

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
