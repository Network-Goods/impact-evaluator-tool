import { getIsUserEvaluator, isAdmin, ServerParams } from "..";
import { Evaluation, Evaluator, Submission } from "../..";

type Params = {
  evaluation_id: string;
  user_id?: string;
};

type Return = {
  data: any;
};

export async function getEvaluationResult({
  supabase,
  auth,
  params: { evaluation_id, user_id },
}: ServerParams<Params>): Promise<Return | Error> {
  user_id = user_id ? user_id : auth.user_id;

  if (!isAdmin(auth) && user_id != auth.user_id) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase
    .rpc("get_evaluation_result_store", {
      evaluation_id,
    })
    .single();

  if (error) {
    console.error(error);
    return new Error(
      `ERROR -- get_evaluation_result_store failed. user_id: ${user_id}, evaluation_id: ${evaluation_id}`,
    );
  }

  return data as any;
}
