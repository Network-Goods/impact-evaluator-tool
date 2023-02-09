import { create } from "zustand";
import { Evaluation, rpc, DashboardEvaluation } from "src/lib";

export interface ResultsStore {
  fetching: boolean;
  error?: any;
  evaluations: any;
  load: () => void;
  data?: any;
}

export const useResultsStore = create<ResultsStore>()((set, get) => ({
  fetching: true,
  evaluations: [],

  load: async () => {
    rpc.call("getAllEvaluations", null).then((data) => {
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
  getEvaluationResult: async (evaluation_id: string): Promise<Error | any> => {
    const data = await rpc.call("getEvaluationResult", { evaluation_id: evaluation_id });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call deleteEvaluation failed`, data);
    }

    set({
      data: data,
    });
  },
}));
