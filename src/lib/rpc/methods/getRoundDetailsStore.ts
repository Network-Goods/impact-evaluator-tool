import { isAdmin, ServerParams } from "..";
import { Submission } from "../..";

type Params = {
  evaluation_id: string;
};

export async function getRoundDetailsStore({
  supabase,
  auth,
  params: { evaluation_id },
}: ServerParams<Params>): Promise<Submission[] | Error> {
  let { data, error } = await supabase
    .from("submission")
    .select("*")
    .eq("evaluation_id", evaluation_id)
    .eq("user_id", auth.user_id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- getRoundDetailsStore failed. message: ${error.message}`);
  }

  if (!data) {
    data = [];
  }

  return data;
}
