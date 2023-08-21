import { userProcedure } from "../../trpc";
import { z } from "zod";

export const getRoundDetailsStore = userProcedure
  .input(
    z.object({
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { supabase, auth }, input }) => {
    const { data, error } = await supabase.rpc("get_round_details_store", {
      user_id: auth.user_id,
      evaluation_id: input.evaluation_id,
    });

    if (error) {
      console.error(error);
      return new Error(`ERROR -- getRoundDetailsStore failed. message: ${error.message}`);
    }

    return data as any;
  });
