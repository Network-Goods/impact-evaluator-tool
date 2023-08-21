import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setGithubLink = userProcedure
  .input(
    z.object({
      id: z.string(),
      link: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase.from("submission").update({ github_link: input.link }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set github link. submission id: ${input.id}`);
    }
  });
