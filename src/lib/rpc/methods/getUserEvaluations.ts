import { ServerParams } from "..";
import { Evaluation } from "../..";

type Params = null;

export async function getUserEvaluations({
  supabase,
  auth,
}: ServerParams<Params>): Promise<Evaluation[] | Error> {
  const { data, error } = await supabase.rpc("get_user_evaluations5", {
    in_user_id: auth.user_id,
  });

  if (error) {
    console.error(error);
    return new Error(
      `ERROR -- get_user_evaluations failed. user_id: ${auth.user_id}`
    );
  }

  return data || [];
}
