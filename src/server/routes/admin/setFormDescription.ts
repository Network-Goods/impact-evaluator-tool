import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setFormDescription = adminProcedure
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
        data: { form_description: input.description },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set form description. evaluation id: ${input.id}`);
    }
  });
