import { isAdmin } from "src/lib/rpc";
import { adminProcedure } from "../../trpc";
import { z } from "zod";

export const getEvaluationResult = adminProcedure
  .input(
    z.object({
      user_id: z.string().nullish(),
      evaluation_id: z.string(),
    }),
  )
  .query(async ({ ctx: { supabase, auth }, input }) => {
    //TODO is this done right??
    input.user_id = input.user_id ? input.user_id : auth.user_id;

    if (!isAdmin(auth) && input.user_id != auth.user_id) {
      return new Error(`Unauthorized`);
    }

    const { data, error } = await supabase
      .rpc("get_evaluation_result_store", {
        evaluation_id: input.evaluation_id,
      })
      .single();

    if (error) {
      console.error(error);
      return new Error(
        `ERROR -- get_evaluation_result_store failed. user_id: ${input.user_id}, evaluation_id: ${input.evaluation_id}`,
      );
    }

    return data as any;
  });
