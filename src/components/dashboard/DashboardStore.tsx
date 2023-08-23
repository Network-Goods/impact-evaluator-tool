import { create } from "zustand";
import { Evaluation, rpc, DashboardEvaluation } from "src/lib";
import { evaluation } from "@prisma/client";
import { trpc } from "src/lib/trpc";

export interface DashboardStore {
  fetching: boolean;
  error?: any;
  evaluations: DashboardEvaluation[];
  load: () => void;
  createEvaluation: () => Promise<evaluation | Error>;
}

export const useDashboardStore = create<DashboardStore>()((set, get) => ({
  fetching: true,
  evaluations: [],

  load: async () => {
    trpc()
      .user.getDashboardStore.query()
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

  createEvaluation: async (): Promise<evaluation | Error> => {
    const newEvaluation: evaluation = {
      ...Evaluation.init(),
    };

    const res = await trpc().admin.createEvaluation.mutate(newEvaluation);

    if (res instanceof Error) {
      return res;
    }
    return newEvaluation;
  },
}));
