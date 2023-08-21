import { adminProcedure } from "../../trpc";

export const getStatusStore = adminProcedure.query(async ({ ctx: { supabase, auth }, input }) => {
  const { data, error } = await supabase.rpc("get_status_store");

  if (error) {
    console.error(error);
    return new Error(`ERROR -- get_status_store failed. message: ${error.message}`);
  }
  //TODO typing?
  return data as any;
});
