import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const deleteFormField = adminProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.EvaluationField.delete({
        where: {
          id: input.id,
        },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to delete form field. evaluation_field id: ${input.id}`);
    }
  });
