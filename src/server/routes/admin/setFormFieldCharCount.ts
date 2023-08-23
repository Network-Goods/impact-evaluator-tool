import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormFieldCharCount = adminProcedure
  .input(
    z.object({
      id: z.string(),
      char_count: z.number(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluationField.update({
        where: { id: input.id },
        data: { char_count: input.char_count },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form field character count. evaluation_field id: ${input.id}`);
    }
  });
