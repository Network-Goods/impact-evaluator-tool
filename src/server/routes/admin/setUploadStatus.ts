import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setUploadStatus = adminProcedure
  .input(
    z.object({
      id: z.string(),
      is_upload: z.boolean(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluation.update({
        where: { id: input.id },
        data: { is_upload: input.is_upload },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation upload status. evaluation id: ${input.id}`);
    }
  });
