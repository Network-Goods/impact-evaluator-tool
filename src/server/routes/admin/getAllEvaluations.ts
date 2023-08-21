import { adminProcedure } from "../../trpc";

export const getAllEvaluations = adminProcedure.query(async ({ ctx: { supabase, auth }, input }) => {
  const { error, data } = await supabase.from("evaluation").select("*");

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to get Admin Store`);
  }

  return (data as any) || [];
});
