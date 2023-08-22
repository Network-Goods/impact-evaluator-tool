import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormFieldHeading = adminProcedure
  .input(
    z.object({
      id: z.string(),
      heading: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluation_field.update({
        where: { id: input.id },
        data: { heading: input.heading },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form field heading. evaluation_field id: ${input.id}`);
    }
  });
