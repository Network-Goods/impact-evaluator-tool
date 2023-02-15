import { create } from "zustand";
import { v4 as uuid } from "uuid";
import { rpc, Submission } from "src/lib";
import { deleteSubmission } from "src/lib/rpc/methods";

export interface RoundDetailsStore {
  fetching: boolean;
  submissions?: Submission[];
  evaluationID?: string;
  userID?: string;
  load: (userID: string, evaluationID: string) => void;
  deleteSubmission: (submissionID: string) => void;
  createSubmission: () => Promise<Submission | null>;
}

export const useRoundDetailsStore = create<RoundDetailsStore>()((set, get) => ({
  fetching: true,
  submission: null,

  load: async (userID: string, evaluationID: string): Promise<void> => {
    const data = await rpc.call("getRoundDetailsStore", {
      evaluation_id: evaluationID,
    });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call getRoundDetailsStore failed. evaluation_id: ${evaluationID}`, data);
      return;
    }

    set({
      submissions: data.submissions,
      evaluationID: evaluationID,
      userID: userID,
      fetching: false,
    });
  },

  deleteSubmission: (submissionID: string): void => {
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
  createSubmission: async (): Promise<Submission | null> => {
    const evaluationID = get().evaluationID;
    const userID = get().userID;

    if (get().fetching || !evaluationID || !userID) {
      return null;
    }

    const newSubmission = Submission.init({
      description: "",
      evaluation_id: evaluationID,
      website_link: "",
      name: "",
      user_id: userID,
      github_link: "",
    });

    const res = await rpc.call("createSubmission", { submission: newSubmission });
    // TODO: error handling
    if (res instanceof Error) {
      console.error(`ERROR -- rpc call createSubmission failed`, res);
      return null;
    }

    return newSubmission;
  },
}));
