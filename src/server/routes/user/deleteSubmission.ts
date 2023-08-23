import { isAdmin } from "src/lib/rpc";
import { userProcedure } from "../../trpc";
import { z } from "zod";

export const deleteSubmission = userProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db, auth }, input }) => {
    let submission;
    try {
      submission = await db.submission.findUnique({
        where: { id: input.id },
        select: { user_id: true },
      });
    } catch (error) {
      console.error(error);
      return new Error("An error occurred while trying to get user_id for auth");
    }

    if (!submission) {
      return new Error("Submission not found");
    }

    if (!isAdmin(auth) && submission.user_id != auth.user_id) {
      return new Error(`Unauthorized`);
    }

    try {
      await db.submission.delete({ where: { id: input.id } });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to delete submission. submission id: ${input.id}`);
    }
  });
