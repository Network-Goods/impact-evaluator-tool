import { isAdmin, ServerParams } from "..";
import { Submission } from "../..";

type Params = {
  evaluation_id: string;
};

export async function getRoundDetailsStore({
  supabase,
  auth,
  params: { evaluation_id },
}: ServerParams<Params>): Promise<any | Error> {
  const { data, error } = await supabase.rpc("get_round_details_store", {
    user_id: auth.user_id,
    evaluation_id: evaluation_id,
  });

  if (error) {
    console.error(error);
    return new Error(`ERROR -- getRoundDetailsStore failed. message: ${error.message}`);
  }

  return data;
}
