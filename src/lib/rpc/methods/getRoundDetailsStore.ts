import { isAdmin, ServerParams } from "..";
import { RoundDetailsData } from "../..";

type Params = {
  evaluation_id: string;
};

export async function getRoundDetailsStore({
  supabase,
  auth,
  params: { evaluation_id },
}: ServerParams<Params>): Promise<RoundDetailsData | Error> {
  const { data, error } = await supabase
    .rpc("get_round_details_store", {
      user_id: auth.user_id,
      evaluation_id: evaluation_id,
    })
    .single();

  if (error) {
    console.error(error);
    return new Error(`ERROR -- get_round_details_store failed. message: ${error.message}`);
  }

  if (!data.submissions) {
    data.submissions = [];
  }

  return data;
}
