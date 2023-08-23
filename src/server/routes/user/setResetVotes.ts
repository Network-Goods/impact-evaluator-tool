import { isAdmin, getIsUserEvaluator } from "src/lib/rpc";
import { userProcedure } from "src/server/trpc";
import { z } from "zod";

// export const setResetVotes = userProcedure
//   .input(
//     z.object({
//       in_evaluator_id: z.string(),
//     }),
//   )
//   .mutation(async ({ ctx: { supabase, auth }, input }) => {
//     const isUserEvaluator = await getIsUserEvaluator(supabase, auth.user_id, input.in_evaluator_id);

//     if (!isAdmin(auth) && !isUserEvaluator) {
//       return new Error(`Unauthorized`);
//     }

//     const { data, error } = await supabase.rpc("reset", {
//       in_evaluator_id: input.in_evaluator_id,
//     });

//     if (error) {
//       console.error(error);
//       return new Error(`ERROR -- failed to reset votes`);
//     }
//   });

export const setResetVotes = userProcedure
  .input(
    z.object({
      in_evaluator_id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db, auth, supabase }, input }) => {
    const isUserEvaluator = await getIsUserEvaluator(supabase, auth.user_id, input.in_evaluator_id);

    if (!isAdmin(auth) && !isUserEvaluator) {
      return new Error(`Unauthorized`);
    }

    try {
      await db.votes.updateMany({
        where: { evaluator_id: input.in_evaluator_id },
        data: { votes: 0 },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to reset votes`);
    }
  });
