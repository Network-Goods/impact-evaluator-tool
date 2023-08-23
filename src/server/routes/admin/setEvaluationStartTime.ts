import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationStartTime = adminProcedure
  .input(
    z.object({
      id: z.string(),
      time: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluation.update({
        where: { id: input.id },
        data: { start_time: input.time },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation start time. evaluation id: ${input.id}`);
    }
  });
