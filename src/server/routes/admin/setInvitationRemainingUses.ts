import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setInvitationRemainingUses = adminProcedure
  .input(
    z.object({
      id: z.string(),
      uses: z.number(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("invitation").update({ remaining_uses: input.uses }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set inviation remaining uses. invitation id: ${input.id}`);
    }
  });
