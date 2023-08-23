import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormFieldPlaceholder = adminProcedure
  .input(
    z.object({
      id: z.string(),
      placeholder: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluationField.update({
        where: { id: input.id },
        data: { placeholder: input.placeholder },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form field placeholder. evaluation_field id: ${input.id}`);
    }
  });
