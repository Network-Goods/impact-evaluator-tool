import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setEmail = adminProcedure
  .input(
    z.object({
      email: z.string(),
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("user").update({ preferred_email: input.email }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set user email. user id: ${input.id}`);
    }
  });
