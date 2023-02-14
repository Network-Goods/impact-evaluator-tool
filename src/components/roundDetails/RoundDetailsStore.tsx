import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { rpc, Submission } from "src/lib";
import { deleteSubmission } from "src/lib/rpc/methods";

export interface RoundDetailsStore {
  fetching: boolean;
  submissions?: Submission[];
  load: (evaluationID: string) => void;
  deleteSubmission: (submissionID: string) => void;
}

export const useRoundDetailsStore = create<RoundDetailsStore>()((set, get) => ({
  fetching: true,
  submission: null,

  load: async (evaluationID: string): Promise<void> => {
    const data = await rpc.call("getRoundDetailsStore", {
      evaluation_id: evaluationID,
    });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call getRoundDetailsStore failed. evaluation_id: ${evaluationID}`, data);
      return;
    }

    set({
      submissions: data.submissions,
      fetching: false,
    });
  },

  deleteSubmission: async (submissionID: string): Promise<void> => {
    if (get().fetching) {
      return;
    }

    const submissions = get().submissions;

    set({
      submissions: submissions?.filter((submission) => submission.id != submissionID),
    });

    rpc.call("deleteSubmission", { id: submissionID }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call deleteSubmission failed`, data);
        return;
      }
    });
  },
}));
