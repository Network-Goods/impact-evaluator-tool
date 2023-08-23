import { isAdmin, getIsUserEvaluator } from "src/lib/rpc";
import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluatorSubmission = userProcedure
  .input(
    z.object({
      evaluator_id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db, auth, supabase }, input }) => {
    const isUserEvaluator = await getIsUserEvaluator(supabase, auth.user_id, input.evaluator_id);

    if (!isAdmin(auth) && !isUserEvaluator) {
      return new Error(`Unauthorized`);
    }

    try {
      await db.evaluator.update({
        where: { id: input.evaluator_id },
        data: { is_submitted: true },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluator submission. evaluator id: ${input.evaluator_id}`);
    }
  });
