import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationName = adminProcedure
  .input(
    z.object({
      id: z.string(),
      name: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluation.update({
        where: { id: input.id },
        data: { name: input.name },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation name. evaluation id: ${input.id}`);
    }
  });
