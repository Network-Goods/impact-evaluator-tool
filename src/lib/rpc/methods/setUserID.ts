import { Submission } from "../..";
import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  user_id: string;
};

export async function setUserID({
  supabase,
  params: { id, user_id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.from("submission").update({ user_id: user_id }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set user id. submission id: ${id}`);
  }
}
