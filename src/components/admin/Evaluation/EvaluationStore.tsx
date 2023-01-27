import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Evaluation, rpc, Submission } from "src/lib";

export interface EvaluationStore {
  fetching: boolean;
  evaluation?: any;
  load: (evaluation_id: string) => void;
  setEvaluationName: (name: string) => void;
  setEvaluationStatus: (status: string) => void;
  deleteEvaluation: () => void;
  createSubmission: () => Promise<Submission | Error>;
  deleteInvitation: (id: string) => void;
  resetVotes: (id: string) => void;
  setVoiceCredits: (id: string, amount: number) => void;
  setEmail: (evalId: string, userId: string, email: string) => void;
  createInvitation: (invitation: any) => void;
  createEvaluator: (invitation: any) => void;
}

export const useEvaluationStore = create<EvaluationStore>()((set, get) => ({
  fetching: true,
  submissions: [],
  evaluation: null,

  load: async (evaluation_id: string): Promise<void> => {
    const data = await rpc.call("getEvaluationStore", {
      evaluation_id: evaluation_id,
    });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call getEvaluation failed. evaluation_id: ${evaluation_id}`, data);
      return;
    }

    set({
      evaluation: data,
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

    // set({
    //   submissions: [...get().submissions, newSubmission],
    // });

    const data = await rpc.call("deleteEvaluation", { id: evaluation.id });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call deleteEvaluation failed`, data);
    }

    return newSubmission;
  },

  deleteInvitation: (id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    set({
      evaluation: {
        ...evaluation,
        invitation: evaluation.invitation.filter((i: any) => i.id !== id),
      },
    });

    rpc.call("deleteInvitation", { id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call deleteInvitation failed`, data);
        return;
      }
    });
  },

  resetVotes: (id: string) => {
    rpc
      .call("setResetVotes", {
        in_evaluator_id: id,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setResetVotes failed`, data);
          return;
        }
      });
  },

  setVoiceCredits: (id: string, amount: number) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    set({
      evaluation: {
        ...evaluation,
        evaluator: evaluation.evaluator.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              voice_credits: amount,
            };
          }
          return e;
        }),
      },
    });

    rpc
      .call("setVoiceCredits", {
        id: id,
        amount: amount,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setResetVotes failed`, data);
          return;
        }
      });
  },
  setEmail: (evalId: string, userId: string, email: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    set({
      evaluation: {
        ...evaluation,
        evaluator: evaluation.evaluator.map((e: any) => {
          if (e.id === evalId) {
            return {
              ...e,
              user: {
                ...e.user,
                preferred_email: email,
              },
            };
          }
          return e;
        }),
      },
    });

    rpc
      .call("setEmail", {
        id: userId,
        email: email,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setResetVotes failed`, data);
          return;
        }
      });
  },

  createInvitation: async (inputs: any) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    const newInvitation = {
      ...inputs,
      id: uuid(),
      evaluation_id: evaluation.id,
    };

    set({
      evaluation: {
        ...evaluation,
        invitation: [...evaluation.invitation, newInvitation],
      },
    });

    rpc
      .call("createInvitation", {
        invitation: newInvitation,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call createInvitation failed`, data);
          return;
        }
      });
  },
  createEvaluator: async (inputs: any) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    const newEvaluator = {
      ...inputs,
      id: uuid(),
      evaluation_id: evaluation.id,
    };

    set({
      evaluation: {
        ...evaluation,
        evaluator: [...evaluation.evaluator, newEvaluator],
      },
    });

    // rpc
    //   .call("createEvaluator", {
    //     evaluator: newEvaluator,
    //   })
    //   .then((data) => {
    //     if (data instanceof Error) {
    //       console.error(`ERROR -- rpc call createEvaluator failed`, data);
    //       return;
    //     }
    //   });
  },
}));
