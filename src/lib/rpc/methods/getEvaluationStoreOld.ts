import { ServerParams } from "..";
import { Evaluation, Evaluator, Submission } from "../..";

type Params = {
  evaluation_id: string;
  user_id?: string;
};

type Return = null;

// type Return = {
//   submissions: Submission[];
//   evaluator: Evaluator;
//   evaluation: Evaluation;
//   votes: { [submission_id: string]: number };
// };

export async function getEvaluationStore({
  supabase,
  auth,
  params: { evaluation_id, user_id },
}: ServerParams<Params>): Promise<Return | Error> {
  console.error("unimplemented");
  return null;

  // user_id = user_id ? user_id : auth.user_id;

  // const { data, error } = await supabase
  //   .rpc("get_voting_store", {
  //     in_evaluation_id: evaluation_id,
  //     in_user_id: user_id,
  //   })
  //   .single();

  // if (error) {
  //   console.error(error);
  //   return new Error(
  //     `ERROR -- get_voting_store failed. user_id: ${user_id}, evaluation_id: ${evaluation_id}`
  //   );
  // }

  // return {
  //   submissions: data.submissions || [],
  //   evaluator: data.evaluator,
  //   evaluation: data.evaluation,
  //   votes: data.votes || {},
  // };
}
