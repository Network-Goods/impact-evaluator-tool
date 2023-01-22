import create from "zustand";
import { v4 as uuid } from "uuid";
import { Evaluation, rpc, Submission } from "src/lib";

export interface EvaluationStore {
  fetching: boolean;
  evaluation?: Evaluation;
  submissions: Submission[];
  load: (evaluation_id: string) => void;
  setEvaluationName: (name: string) => void;
  setEvaluationStatus: (status: string) => void;
  deleteEvaluation: () => void;
  createSubmission: () => Promise<Submission | Error>;
}

export const useEvaluationStore = create<EvaluationStore>()((set, get) => ({
  fetching: true,
  submissions: [],
  load: (evaluation_id: string) => {
    if (get().fetching) {
      return;
    }

    set({
      fetching: false,
    });
  },

  setEvaluationName: (name: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        name: name,
      },
    });

    rpc.call("setEvaluationName", { name: name, id: evaluation.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluationName failed`, data);
        return;
      }
    });
  },

  setEvaluationStatus: (status: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        status,
      },
    });

    rpc.call("setEvaluationStatus", { status: status, id: evaluation.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluationName failed`, data);
        return;
      }
    });
  },

  deleteEvaluation: () => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    rpc.call("deleteEvaluation", { id: evaluation.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call deleteEvaluation failed`, data);
        return;
      }
    });
  },

  createSubmission: async (): Promise<Error | Submission> => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    const newSubmission = Submission.init({
      description: "",
      evaluation_id: evaluation.id,
      website_link: "",
      name: "",
      user_id: "",
      github_link: "",
    });

    set({
      submissions: [...get().submissions, newSubmission],
    });

    const data = await rpc.call("deleteEvaluation", { id: evaluation.id });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call deleteEvaluation failed`, data);
    }

    return newSubmission;
  },
}));
