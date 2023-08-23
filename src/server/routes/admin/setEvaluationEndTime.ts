import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationEndTime = adminProcedure
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
        data: { end_time: input.time },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation end time. evaluation id: ${input.id}`);
    }
  });
