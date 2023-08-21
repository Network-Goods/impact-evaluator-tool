import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setVoiceCredits = adminProcedure
  .input(
    z.object({
      id: z.string(),
      amount: z.number(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    const { error } = await supabase.from("evaluator").update({ voice_credits: input.amount }).eq("id", input.id);

    if (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set evaluation name. evaluation id: ${input.id}`);
    }
  });
