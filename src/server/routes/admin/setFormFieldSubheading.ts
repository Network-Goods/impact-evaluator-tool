import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormFieldSubheading = adminProcedure
  .input(
    z.object({
      id: z.string(),
      subheading: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluationField.update({
        where: { id: input.id },
        data: { subheading: input.subheading },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form field subheading. evaluation_field id: ${input.id}`);
    }
  });
