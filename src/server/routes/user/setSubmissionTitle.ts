import { isAdmin } from "src/lib/rpc";
import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setSubmissionTitle = userProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      user_id: z.string().nullish(),
    }),
  )
  .mutation(async ({ ctx: { db, auth }, input }) => {
    if (!isAdmin(auth) && input.user_id != auth.user_id) {
      return new Error(`Unauthorized`);
    }

    try {
      await db.submission.update({
        where: { id: input.id },
        data: { name: input.title.trim() },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set link title. submission id: ${input.id}`);
    }
  });
