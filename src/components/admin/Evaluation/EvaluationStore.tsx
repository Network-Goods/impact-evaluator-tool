import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { Evaluation, rpc, Submission } from "src/lib";

export interface EvaluationStore {
  fetching: boolean;
  evaluation?: any;
  load: (evaluation_id: string) => void;
  setEvaluationName: (name: string) => void;
  setEvaluationDescription: (description: string) => void;
  setEvaluationStatus: (status: string) => void;
  setEvaluationStartTime: (time: Date) => void;
  setEvaluationEndTime: (time: Date) => void;
  setFormDescription: (form_description: string) => void;
  createFormField: () => void;
  setFormFieldName: (name: string, id: string) => void;
  deleteFormField: (id: string) => void;
  deleteEvaluation: () => void;
  createSubmission: () => Promise<Submission | null>;
  setInvitationCode: (code: string, id: string) => void;
  setInvitationCredits: (credits: string, id: string) => void;
  setInvitationRemainingUses: (uses: string, id: string) => void;
  setInvitationSubmissionRequired: (id: string, is_sme: boolean) => void;
  deleteInvitation: (id: string) => void;
  resetVotes: (id: string) => void;
  setVoiceCredits: (id: string, amount: number) => void;
  setEmail: (evalId: string, userId: string, email: string) => void;
  createInvitation: (invitation?: any) => void;
  createEvaluator: (evaluator: any) => void;
  setSubmissionTitle: (title: string, id: string) => void;
  setSubmissionDescription: (text: string, type: string, id: string) => void;
  setSubmissionLinkTitle: (title: string, index: number, id: string) => void;
  setSubmissionLink: (value: string, index: number, id: string) => void;
  setGithubLink: (link: string, id: string) => void;
  setGithubHandle: (handle: string, id: string) => void;
  createSubmissionLink: (link: any, id: string) => void;
  deleteSubmissionLink: (index: number, id: string) => void;
  setUserID: (userID: string, id: string) => void;
  deleteSubmission: (id: string) => void;
  setSubmission: (id: string) => void;
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

  setEvaluationDescription: (description: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        description,
      },
    });

    rpc.call("setEvaluationDescription", { description: description, id: evaluation.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluationDescription failed`, data);
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
        console.error(`ERROR -- rpc call setEvaluationStatus failed`, data);
        return;
      }
    });
  },
  setEvaluationStartTime: (time: Date) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        start_time: time,
      },
    });
    rpc.call("setEvaluationStartTime", { time: time, id: evaluation.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluationStartTime failed`, data);
        return;
      }
    });
  },
  setEvaluationEndTime: (time: Date) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        end_time: time,
      },
    });
    rpc.call("setEvaluationEndTime", { time: time, id: evaluation.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluationEndTime failed`, data);
        return;
      }
    });
  },

  setFormDescription: (form_description: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        form_description,
      },
    });

    rpc.call("setFormDescription", { description: form_description, id: evaluation.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setFormDescription failed`, data);
        return;
      }
    });
  },
  createFormField: () => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    const newFormField = {
      id: uuid(),
      evaluation_id: evaluation.id,
      field_name: "",
    };

    set({
      evaluation: {
        ...evaluation,
        evaluation_field: [...evaluation.evaluation_field, newFormField],
      },
    });

    rpc
      .call("createFormField", {
        formField: newFormField,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call createFormField failed`, data);
          return;
        }
      });
  },
  setFormFieldName: (name: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }
    set({
      evaluation: {
        ...evaluation,
        evaluation_field: evaluation.evaluation_field.map((field: any) => {
          if (field.id === id) {
            return {
              ...field,
              field_name: name,
            };
          }
          return field;
        }),
      },
    });

    rpc.call("setFormFieldName", { name: name, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setFormFieldName failed`, data);
        return;
      }
    });
  },
  deleteFormField: (id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    const newArr = evaluation.evaluation_field.filter((field: any) => field.id !== id);

    set({
      evaluation: {
        ...evaluation,
        evaluation_field: newArr,
      },
    });

    rpc.call("deleteFormField", { id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call deleteFormField failed`, data);
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

  createSubmission: async (): Promise<Submission | null> => {
    const evaluation = get().evaluation;

    if (get().fetching || !evaluation) {
      return null;
    }

    const newSubmission = Submission.init({
      description: "",
      evaluation_id: evaluation.id,
      name: "",
      github_link: "",
      github_handle: "",
      links: [],
    });

    set({
      evaluation: {
        ...evaluation,
        submission: [...evaluation.submission, newSubmission],
      },
    });

    const res = await rpc.call("createSubmission", { submission: newSubmission });
    // TODO: error handling
    if (res instanceof Error) {
      console.error(`ERROR -- rpc call createSubmission failed`, res);
      return null;
    }
    return newSubmission;
  },

  setInvitationCode: (code: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    const trimmedCode = code.trim();

    set({
      evaluation: {
        ...evaluation,
        invitation: evaluation.invitation.map((i: any) => {
          if (i.id === id) {
            return {
              ...i,
              code: trimmedCode,
            };
          }
          return i;
        }),
      },
    });

    rpc.call("setInvitationCode", { code: trimmedCode, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setInvitationCode failed`, data);
        return;
      }
    });
  },
  setInvitationCredits: (credits: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        invitation: evaluation.invitation.map((i: any) => {
          if (i.id === id) {
            return {
              ...i,
              voice_credits: credits,
            };
          }
          return i;
        }),
      },
    });

    rpc.call("setInvitationCredits", { credits: credits, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setInvitationCredits failed`, data);
        return;
      }
    });
  },
  setInvitationRemainingUses: (uses: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        invitation: evaluation.invitation.map((i: any) => {
          if (i.id === id) {
            return {
              ...i,
              remaining_uses: uses,
            };
          }
          return i;
        }),
      },
    });

    rpc.call("setInvitationRemainingUses", { uses: uses, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setInvitationRemainingUses failed`, data);
        return;
      }
    });
  },

  setInvitationSubmissionRequired: (id: string, is_sme: boolean) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }
    console.log("issme", is_sme);
    set({
      evaluation: {
        ...evaluation,
        invitation: evaluation.invitation.map((i: any) => {
          if (i.id === id) {
            return {
              ...i,
              is_sme: !is_sme,
            };
          }
          return i;
        }),
      },
    });

    rpc.call("setInvitationSubmissionRequired", { is_sme: !is_sme, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setInvitationSubmissionRequired failed`, data);
        return;
      }
    });
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
          console.error(`ERROR -- rpc call setVoiceCredits failed`, data);
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
          console.error(`ERROR -- rpc call setEmail failed`, data);
          return;
        }
      });
  },

  createInvitation: async (inputs?: any) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    const invitationInputs = inputs || null;

    const newInvitation = {
      ...invitationInputs,
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
    // const evaluation = get().evaluation;
    // if (!evaluation) {
    //   return new Error("Evaluation not loaded");
    // }
    // const newEvaluator = {
    //   ...inputs,
    //   id: uuid(),
    //   evaluation_id: evaluation.id,
    // };
    // set({
    //   evaluation: {
    //     ...evaluation,
    //     evaluator: [...evaluation.evaluator, newEvaluator],
    //   },
    // });
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
  setSubmissionTitle: (title: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    const trimmedTitle = title.trim();

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              name: trimmedTitle,
            };
          }
          return e;
        }),
      },
    });

    rpc
      .call("setSubmissionTitle", {
        id: id,
        title: trimmedTitle,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setSubmissionTitle failed`, data);
          return;
        }
      });
  },
  setSubmissionDescription: (text: string, type: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }
    const oldObj = evaluation.submission.find((e: any) => e.id === id).description;
    const newObj = {
      ...oldObj,
      [type]: text,
    };

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              description: newObj,
            };
          }
          return e;
        }),
      },
    });

    rpc.call("setSubmissionDescription", { newObj: newObj, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluationName failed`, data);
        return;
      }
    });
  },

  setSubmissionLinkTitle: (title: string, index: number, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    const oldArr = evaluation.submission.find((e: any) => e.id === id).links;
    const newArr = oldArr.map((e: any, idx: number) => {
      if (idx === index) {
        return {
          ...e,
          name: title,
        };
      }
      return e;
    });
    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              links: newArr,
            };
          }
          return e;
        }),
      },
    });

    rpc.call("setLink", { newArr: newArr, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setLink failed`, data);
        return;
      }
    });
  },
  setSubmissionLink: (value: string, index: number, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    const oldArr = evaluation.submission.find((e: any) => e.id === id).links;
    const newArr = oldArr.map((e: any, idx: number) => {
      if (idx === index) {
        return {
          ...e,
          value: value,
        };
      }
      return e;
    });

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              links: newArr,
            };
          }
          return e;
        }),
      },
    });

    rpc.call("setLink", { newArr: newArr, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setLink failed`, data);
        return;
      }
    });
  },

  setGithubLink: (link: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              github_link: link,
            };
          }
          return e;
        }),
      },
    });

    rpc.call("setGithubLink", { link: link, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setGithubLink failed`, data);
        return;
      }
    });
  },
  setGithubHandle: (handle: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }
    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              github_handle: handle,
            };
          }
          return e;
        }),
      },
    });

    rpc
      .call("setGithubHandle", {
        id: id,
        github_handle: handle,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setGithubHandle failed`, data);
          return;
        }
      });
  },
  createSubmissionLink: (id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }
    const oldArr = evaluation.submission.find((e: any) => e.id === id).links;
    const newArr = oldArr
      ? [
          ...oldArr,
          {
            name: "",
            value: "",
          },
        ]
      : [
          {
            name: "",
            value: "",
          },
        ];

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              links: newArr,
            };
          }
          return e;
        }),
      },
    });

    rpc.call("setLink", { newArr: newArr, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluationName failed`, data);
        return;
      }
    });
  },
  deleteSubmissionLink: (index: number, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return;
    }
    const oldArr = evaluation.submission.find((e: any) => e.id === id).links;
    const newArr = oldArr.filter((e: any, idx: number) => idx !== index);

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              links: newArr,
            };
          }
          return e;
        }),
      },
    });

    rpc.call("setLink", { newArr: newArr, id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluationName failed`, data);
        return;
      }
    });
  },

  setUserID: (userID: string, id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              user_id: userID,
            };
          }
          return e;
        }),
      },
    });

    rpc
      .call("setUserID", {
        id: id,
        user_id: userID,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setUserID failed`, data);
          return;
        }
      });
  },
  deleteSubmission: (id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.filter((i: any) => i.id !== id),
      },
    });

    rpc.call("deleteSubmission", { id: id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call deleteSubmission failed`, data);
        return;
      }
    });
  },
  setSubmission: (id: string) => {
    const evaluation = get().evaluation;

    if (!evaluation) {
      return new Error("Evaluation not loaded");
    }

    set({
      evaluation: {
        ...evaluation,
        submission: evaluation.submission.map((e: any) => {
          if (e.id === id) {
            return {
              ...e,
              is_submitted: true,
            };
          }
          return e;
        }),
      },
    });

    rpc
      .call("setSubmission", {
        id: id,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setSubmission failed`, data);
          return;
        }
      });
  },
}));
