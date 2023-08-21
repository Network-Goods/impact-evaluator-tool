import { userProcedure } from "src/server/trpc";
import { z } from "zod";

export const setGithubHandle = userProcedure
  .input(
    z.object({
      id: z.string(),
      github_handle: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase
      .from("submission")
      .update({ github_handle: input.github_handle })
      .eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set github handle. submission id: ${input.id}`);
    }
  });
