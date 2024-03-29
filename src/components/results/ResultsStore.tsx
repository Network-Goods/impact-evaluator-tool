import { create } from "zustand";
import { Evaluation, rpc, DashboardEvaluation } from "src/lib";
import { sortEvaluationResults } from "src/lib/utils";
import { parseEvaluationResults } from "src/lib/utils";
import { parseNestedArraysIntoCSV } from "src/lib/utils";
import { downloadCSV } from "src/lib/utils";

export interface ResultsStore {
  fetching: boolean;
  error?: any;
  evaluations: any;
  load: () => void;
  data?: any;
  getEvaluationResult: (evaluation_id: string) => Promise<Error | any>;
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

    sortEvaluationResults(data);
    const parsedArray = parseEvaluationResults(data);
    const csv = parseNestedArraysIntoCSV(parsedArray);
    const csv_name = `${(data as any).evaluation.name} - Results.csv`;
    downloadCSV(csv, csv_name);
  },
}));
