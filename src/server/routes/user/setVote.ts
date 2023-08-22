import { isAdmin, getIsUserEvaluator } from "src/lib/rpc";
import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setVote = userProcedure
  .input(
    z.object({
      in_evaluator_id: z.string(),
      in_submission_id: z.string(),
      vote_count: z.number(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const isUserEvaluator = await getIsUserEvaluator(supabase, auth.user_id, input.in_evaluator_id);

    if (!isAdmin(auth) && !isUserEvaluator) {
      return new Error(`Unauthorized`);
    }

    const { error } = await supabase.rpc("upsertvote", {
      in_evaluator_id: input.in_evaluator_id,
      in_submission_id: input.in_submission_id,
      vote_count: input.vote_count,
    });

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to upsert vote`);
    }
  });