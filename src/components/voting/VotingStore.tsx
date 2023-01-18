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

function calculateAvailableCredits(votes: SubmissionVotes) {
  let usedCredits = 0;
  for (let submission_id in votes) {
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
  submissions: FromGraphQL<Submission>[];
  expandedSubmissions: { [submissionId: string]: boolean };
  availableCredits: number;
  allocatedCredits: number;
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
  reset: (supabase: SupabaseClient) => Promise<void>;
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
      votes: data.votes || {},
      submissions: data.submissions,
      evaluator: data.evaluator,
      availableCredits:
        data.evaluator.voice_credits - calculateAvailableCredits(data.votes),
      allocatedCredits: data.evaluator.voice_credits,
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
      availableCredits:
        get().availableCredits +
        current_votes * current_votes -
        (current_votes + 1) * (current_votes + 1),
      votes: {
        ...get().votes,
        [submission_id]: current_votes + 1,
      },
    });

    let { data, error } = await supabase.rpc(
      "upsertvote",
      {
        in_evaluator_id: evaluator.id,
        in_submission_id: submission_id,
        vote_count: current_votes + 1,
      }

      // let { data, error } = await supabase.rpc("increment", {
      //   in_evaluator_id: evaluator.id,
      //   in_submission_id: submission_id,
      // }
    );

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
      availableCredits:
        get().availableCredits +
        current_votes * current_votes -
        (current_votes - 1) * (current_votes - 1),
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

    return (
      get().availableCredits + (votes - 1) * (votes - 1) - votes * votes <= 1
    );
  },
  reset: async (supabase: SupabaseClient) => {
    const evaluator = get().evaluator;
    if (!evaluator) {
      console.error("Cannot reset without an evaluator");
      return;
    }

    function resetVotes(votes: SubmissionVotes) {
      for (let submission_id in votes) {
        votes[submission_id] = 0;
      }
      return votes;
    }

    set({
      availableCredits: get().allocatedCredits,
      votes: resetVotes(get().votes),
    });

    let { data, error } = await supabase.rpc("reset", {
      in_evaluator_id: evaluator.id,
    });

    if (error) {
      console.error(error);
    } else {
      console.log("reset result data: ", data);
    }
  },
}));
