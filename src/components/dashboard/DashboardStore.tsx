import { create } from "zustand";
import { Evaluation, rpc, DashboardEvaluation } from "src/lib";
import { Evaluation as evaluation } from "@prisma/client";
import { trpc } from "src/lib/trpc";
import { Dispatch, SetStateAction } from "react";

export interface DashboardStore {
  fetching: boolean;
  error?: any;
  evaluations: DashboardEvaluation[];
  load: () => void;
  createEvaluation: () => Promise<evaluation | Error>;
}

export function useDashboardStore(setSpinner: Dispatch<SetStateAction<number>>) {
  return create<DashboardStore>()((set, get) => ({
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

          setSpinner((prev) => prev + 1);
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
}

// setSpinner: Dispatch<SetStateAction<number>>

// export const useDashboardStore = create<DashboardStore>()((set, get) => ({
//   fetching: true,
//   evaluations: [],

//   load: async () => {
//     trpc()
//       .user.getDashboardStore.query()
//       .then((data) => {
//         if (data instanceof Error) {
//           console.error(`ERROR -- rpc call getUserEvaluations failed`, data);
//           return;
//         }

//         set({
//           fetching: false,
//           evaluations: data,
//         });
//       });
//   },

//   createEvaluation: async (): Promise<evaluation | Error> => {
//     const newEvaluation: evaluation = {
//       ...Evaluation.init(),
//     };

//     const res = await trpc().admin.createEvaluation.mutate(newEvaluation);

//     if (res instanceof Error) {
//       return res;
//     }
//     return newEvaluation;
//   },
// }));
