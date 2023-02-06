import { create } from "zustand";
import { Submission, rpc } from "src/lib";

function calculateAvailableCredits(votes: SubmissionVotes) {
  let usedCredits = 0;
  for (const submission_id in votes) {
    usedCredits += votes[submission_id] * votes[submission_id];
  }
  return usedCredits;
}

type SubmissionVotes = { [submission_id: string]: number };

export type VotingStore = {
  loaded: boolean;
  votes: SubmissionVotes;
  evaluator: { id: string; voice_credits: number } | null;
  evaluation: any | null;
  submissions: Submission[];
  expandedSubmissions: { [submissionId: string]: boolean };
  availableCredits: number;
  allocatedCredits: number;
  load: (evaluation_id: string) => Promise<void>;
  incrementVote: (submission_id: string) => void;
  decrementVote: (submission_id: string) => void;
  getVotes: (submission_id: string) => number;
  getAllocatedVoiceCredits: (submission_id: string) => number;
  canVoteAgain: (submission_id: string) => boolean;
  resetVotes: () => void;
  setEvaluatorSubmission: () => void;
};

export const useVotingStore = create<VotingStore>()((set, get) => ({
  loaded: false,
  votes: {},
  evaluator: null,
  evaluation: null,
  submissions: [],
  expandedSubmissions: {},
  availableCredits: 0,
  allocatedCredits: 0,

  load: async (evaluation_id: string): Promise<void> => {
    const data = await rpc.call("getVotingStore", {
      evaluation_id: evaluation_id,
    });

    if (data instanceof Error) {
      console.error(`ERROR -- rpc call getVotingStore failed. evaluation_id: ${evaluation_id}`, data);
      return;
    }

    set({
      votes: data.votes,
      submissions: data.submissions,
      evaluator: data.evaluator,
      availableCredits: data.evaluator.voice_credits - calculateAvailableCredits(data.votes),
      allocatedCredits: data.evaluator.voice_credits,
      evaluation: data.evaluation,
      loaded: true,
    });
  },

  incrementVote: (submission_id: string) => {
    const evaluator = get().evaluator;
    if (!evaluator) {
      console.error("Cannot vote without an evaluator");
      return;
    }

    const current_votes = get().votes[submission_id] || 0;

    set({
      availableCredits:
        get().availableCredits + current_votes * current_votes - (current_votes + 1) * (current_votes + 1),
      votes: {
        ...get().votes,
        [submission_id]: current_votes + 1,
      },
    });

    rpc
      .call("setVote", {
        in_evaluator_id: evaluator.id,
        in_submission_id: submission_id,
        vote_count: current_votes + 1,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setVote failed`, data);
          return;
        }
      });
  },

  decrementVote: (submission_id: string) => {
    const evaluator = get().evaluator;
    if (!evaluator) {
      console.error("Cannot vote without an evaluator");
      return;
    }

    const current_votes = get().votes[submission_id] || 0;

    if (current_votes == 0) {
      return;
    }

    set({
      availableCredits:
        get().availableCredits + current_votes * current_votes - (current_votes - 1) * (current_votes - 1),
      votes: {
        ...get().votes,
        [submission_id]: current_votes - 1,
      },
    });

    rpc
      .call("setVote", {
        in_evaluator_id: evaluator.id,
        in_submission_id: submission_id,
        vote_count: current_votes - 1,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setVote failed`, data);
          return;
        }
      });
  },

  getVotes: (submission_id: string): number => {
    return get().votes[submission_id] || 0;
  },

  getAllocatedVoiceCredits: (submission_id: string): number => {
    // TODO: should call getVotes instead of duplicating the code
    const votes = get().votes[submission_id] || 0;
    return votes * votes;
  },

  canVoteAgain: (submission_id: string): boolean => {
    const votes = get().votes[submission_id] || 0;

    return get().availableCredits + (votes - 1) * (votes - 1) - votes * votes <= 1;
  },
  resetVotes: () => {
    const evaluator = get().evaluator;
    if (!evaluator) {
      console.error("Cannot reset without an evaluator");
      return;
    }

    function resetVotes(votes: SubmissionVotes) {
      for (const submission_id in votes) {
        votes[submission_id] = 0;
      }
      return votes;
    }

    set({
      availableCredits: get().allocatedCredits,
      votes: resetVotes(get().votes),
    });

    rpc
      .call("setResetVotes", {
        in_evaluator_id: evaluator.id,
      })
      .then((data) => {
        if (data instanceof Error) {
          console.error(`ERROR -- rpc call setResetVotes failed`, data);
          return;
        }
      });
  },
  setEvaluatorSubmission: () => {
    const evaluator = get().evaluator;

    if (!evaluator) {
      return;
    }

    rpc.call("setEvaluatorSubmission", { evaluator_id: evaluator.id }).then((data) => {
      if (data instanceof Error) {
        console.error(`ERROR -- rpc call setEvaluatorSubmission failed`, data);
        return;
      }
    });
  },
}));
