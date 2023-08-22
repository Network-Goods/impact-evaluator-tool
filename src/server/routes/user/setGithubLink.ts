import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setGithubLink = userProcedure
  .input(
    z.object({
      id: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.submission.update({
        where: { id: input.id },
        data: { github_link: input.link },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set github link. submission id: ${input.id}`);
    }
  });
