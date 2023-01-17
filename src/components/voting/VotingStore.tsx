import create from "zustand";
import { v4 as uuid } from "uuid";

import { DocumentType, gql } from "src/gql";
import { graphQLClient } from "../../lib/graphqlClient";
import { createUser, FromGraphQL } from "../../lib/dbUtils";
import { supabase } from "@supabase/auth-ui-react/dist/esm/common/theming";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { Submission } from "src/gql/graphql";

async function fetchData(
  supabase: SupabaseClient,
  evaluation_id: string,
  user_id: string
) {
  let { data, error } = await supabase.rpc("get_user_evaluation_votes", {
    in_evaluation_id: evaluation_id,
    in_user_id: user_id,
  });

  if (error) {
    console.error("Failed to fetch votes", error);
    return null;
  }

  if (!data) {
    console.error("fetchVotes returned no data");
    return null;
  }

  console.log("fetch data", data);
  return data;
}

type SubmissionVotes = { [submission_id: string]: number };

export type VotingStore = {
  loaded: boolean;
  votes: SubmissionVotes;
  evaluator: { id: string; voice_credits: number } | null;
  evaluation: any | null;
  submissions: FromGraphQL<Submission>[];
  expandedSubmissions: { [submissionId: string]: boolean };
  availableCredits: number;
  load: (
    supabase: SupabaseClient,
    evaluation_id: string,
    user_id: string
  ) => Promise<void>;
  incrementVote: (
    supabase: SupabaseClient,
    submission_id: string
  ) => Promise<void>;

  decrementVote: (
    supabase: SupabaseClient,
    submission_id: string
  ) => Promise<void>;
  getVotes: (submission_id: string) => number;
  getAllocatedVoiceCredits: (submission_id: string) => number;
  canVoteAgain: (submission_id: string) => boolean;
};

export const useVotingStore = create<VotingStore>()((set, get) => ({
  loaded: false,
  votes: {},
  evaluator: null,
  evaluation: null,
  submissions: [],
  expandedSubmissions: {},
  availableCredits: 0,

  load: async (
    supabase: SupabaseClient,
    evaluation_id: string,
    user_id: string
  ): Promise<void> => {
    let data = (await fetchData(supabase, evaluation_id, user_id)) as any;
    if (!data) {
      return;
    }

    set({
      votes: data.votes,
      submissions: data.submissions,
      evaluator: data.evaluator,
      evaluation: data.evaluation,
      loaded: true,
    });
  },

  incrementVote: async (supabase: SupabaseClient, submission_id: string) => {
    const evaluator = get().evaluator;
    if (!evaluator) {
      console.error("Cannot vote without an evaluator");
      return;
    }

    const current_votes = get().votes[submission_id] || 0;

    set({
      votes: {
        ...get().votes,
        [submission_id]: current_votes + 1,
      },
    });

    let { data, error } = await supabase.rpc("increment", {
      in_evaluator_id: evaluator.id,
      in_submission_id: submission_id,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("increment result data: ", data);
    }
  },

  decrementVote: async (supabase: SupabaseClient, submission_id: string) => {
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
      votes: {
        ...get().votes,
        [submission_id]: current_votes - 1,
      },
    });

    let { data, error } = await supabase.rpc("decrement", {
      in_evaluator_id: evaluator.id,
      in_submission_id: submission_id,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("decrement result data: ", data);
    }
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

    return (votes - 1) * (votes - 1) - votes * votes <= 1;
  },
}));
