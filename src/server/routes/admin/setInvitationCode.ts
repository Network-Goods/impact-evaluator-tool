import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setInvitationCode = adminProcedure
  .input(
    z.object({
      id: z.string(),
      code: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("invitation").update({ code: input.code }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set inviation code. invitation id: ${input.id}`);
    }
  });
