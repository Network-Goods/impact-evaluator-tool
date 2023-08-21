import { userProcedure } from "../../trpc";
import { z } from "zod";

export const joinWithCode = userProcedure
  .input(
    z.object({
      user_id: z.string(),
      code: z.string(),
      preferred_email: z.string(),
    }),
  )
  .mutation(async ({ ctx: { supabase, auth }, input }) => {
    // TODO: if user has already joined the round error, we should show which round it is that they tried to rejoin
    // TODO: errors raised in stored procedures are now caught in the error object? (causes a panic)
    const { data, error } = await supabase.rpc("join_with_code", input).single();

    if (error) {
      console.error("Failed to join round", error, input);
      return {
        error: "Error: Please contact round administrator for support.",
      };
    }

    return data as any;
  });
