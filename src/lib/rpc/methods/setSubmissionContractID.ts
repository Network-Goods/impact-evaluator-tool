import { Submission } from "../..";
import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  contract_id: string;
  user_id?: string;
};

export async function setSubmissionContractID({
  supabase,
  params: { id, contract_id, user_id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  user_id = user_id ? user_id : auth.user_id;

  if (!isAdmin(auth) && user_id != auth.user_id) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.from("submission").update({ contract_id: contract_id }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set contract ID. submission id: ${id}`);
  }
}
