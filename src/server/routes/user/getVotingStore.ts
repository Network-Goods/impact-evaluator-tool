import { isAdmin } from "src/lib/rpc";
import { Evaluation, Evaluator, Submission } from "src/lib";
import { userProcedure } from "../../trpc";
import { z } from "zod";

type Return = {
  submissions: Submission[];
  evaluator: Evaluator;
  evaluation: Evaluation;
  votes: { [submission_id: string]: number };
};

export const getVotingStore = userProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { supabase, auth }, input }) => {
    if (!isAdmin(auth)) {
      return new Error(`Unauthorized`);
    }

    // User has to be evaluator for the evaluation for get_voting_store to work

    const { data, error } = await supabase
      .rpc("get_voting_store", {
        in_evaluation_id: input.evaluation_id,
        in_user_id: auth.user_id,
      })
      .single();

    if (error) {
      console.error(error);
      // return new Error(
      //   `ERROR -- get_voting_store failed. user_id: ${auth.user_id}, evaluation_id: ${input.evaluation_id}`,
      // );
    }

    const d: any = data;

    return {
      submissions: d.submissions || [],
      evaluator: d.evaluator,
      evaluation: d.evaluation,
      votes: d.votes || {},
    };
  });
