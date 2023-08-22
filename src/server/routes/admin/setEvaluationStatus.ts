import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationStatus = adminProcedure
  .input(
    z.object({
      id: z.string(),
      status: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluation.update({
        where: { id: input.id },
        data: { status: input.status },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation status. evaluation id: ${input.id}`);
    }
  });
