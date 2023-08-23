import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setGithubHandle = userProcedure
  .input(
    z.object({
      id: z.string(),
      github_handle: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.Submission.update({
        where: { id: input.id },
        data: { github_handle: input.github_handle },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set github handle. submission id: ${input.id}`);
    }
  });
