import { getIsUserEvaluator, isAdmin, ServerParams } from "../..";

type Params = {
  evaluation_id: string;
};

type Return = {
  submissions: any[];
};

export async function getSubmissions({
  supabase,
  auth,
  params: { evaluation_id },
}: ServerParams<Params>): Promise<Return | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  // User has to be evaluator for the evaluation for get_voting_store to work

  const { data, error } = await supabase
    .rpc("get_submissions", {
      in_evaluation_id: evaluation_id,
    })
    .single();

  if (error) {
    console.error(error);
    return new Error(`ERROR -- get_submissions failed. evaluation_id: ${evaluation_id}`);
  }

  const d: any = data;

  return {
    submissions: d.submissions || [],
  };
}
