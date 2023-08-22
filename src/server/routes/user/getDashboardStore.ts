import { userProcedure } from "../../trpc";

export const getDashboardStore = userProcedure.query(async ({ ctx: { supabase, auth } }) => {
  const { data, error } = await supabase.rpc("get_dashboard_store", {
    user_id: auth.user_id,
  });

  if (error) {
    console.error(error);
    return new Error(`ERROR -- get_dashboard_store failed. user_id: ${auth.user_id}`);
  }

  return (data as any) || [];
});