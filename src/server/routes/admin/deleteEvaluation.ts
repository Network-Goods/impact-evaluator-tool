import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const deleteEvaluation = adminProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluation.delete({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to delete evaluation. evaluation id: ${input.id}`);
    }
  });
