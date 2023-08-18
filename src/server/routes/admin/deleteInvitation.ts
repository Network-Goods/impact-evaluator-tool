import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const deleteInvitation = adminProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase.from("invitation").delete().eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to delete invitation. invitation id: ${input.id}`);
    }
  });
