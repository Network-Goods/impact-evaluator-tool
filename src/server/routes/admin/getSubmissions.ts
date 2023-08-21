import { Submission } from "src/lib";
import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const getSubmissions = adminProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { supabase, auth }, input }) => {
    // User has to be evaluator for the evaluation for get_voting_store to work

    const { data, error } = await supabase
      .rpc("get_submissions", {
        in_evaluation_id: input.evaluation_id,
      })
      .single();

    if (error) {
      console.error(error);
      // return new Error(`ERROR -- get_submissions failed. evaluation_id: ${input.evaluation_id}`);
    }

    const d: any = data;

    return {
      submissions: (d.submissions || []) as Submission[],
    };
  });
