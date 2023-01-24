import { ServerParams } from "..";
import { DashboardEvaluation } from "../..";

type Params = null;

export async function getEvaluationStore({
  supabase,
  auth,
}: ServerParams<Params>): Promise<DashboardEvaluation[] | Error> {
  const { error, data } = await supabase.from("evaluation").select("*");

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to get Admin Store`);
  }

  return data || [];
}
// export async function getDashboardStore({
//   supabase,
//   auth,
// }: ServerParams<Params>): Promise<DashboardEvaluation[] | Error> {
//   const { data, error } = await supabase.rpc("get_dashboard_store", {
//     in_user_id: auth.user_id,
//   });

//   if (error) {
//     console.error(error);
//     return new Error(`ERROR -- get_dashboard_store failed. user_id: ${auth.user_id}`);
//   }

//   return data || [];
// }
