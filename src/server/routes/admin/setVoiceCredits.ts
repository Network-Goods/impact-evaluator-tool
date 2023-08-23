import { adminProcedure } from "src/server/trpc";
import { z } from "zod";

export const setVoiceCredits = adminProcedure
  .input(
    z.object({
      id: z.string(),
      amount: z.number(),
    }),
  )
  .mutation(async ({ ctx: { db }, input }) => {
    try {
      await db.evaluator.update({
        where: { id: input.id },
        data: { voice_credits: input.amount },
      });
    } catch (error) {
      console.error(error);
      return new Error(`ERROR -- failed to set voice credits. evaluator id: ${input.id}`);
    }
  });
