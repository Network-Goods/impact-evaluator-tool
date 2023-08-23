import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEvaluationDescription = adminProcedure
  .input(
    z.object({
      id: z.string(),
      description: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.Evaluation.update({
        where: { id: input.id },
        data: { description: input.description },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation description. evaluation id: ${input.id}`);
    }
  });
