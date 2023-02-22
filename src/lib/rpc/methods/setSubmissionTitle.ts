import { Submission } from "../..";
import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  title: string;
  user_id?: string;
};

export async function setSubmissionTitle({
  supabase,
  params: { id, title, user_id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  user_id = user_id ? user_id : auth.user_id;

  if (!isAdmin(auth) && user_id != auth.user_id) {
    return new Error(`Unauthorized`);
  }
  // Trimming the title here and in setSubmissionTitle in SubmissionStore
  const { data, error } = await supabase.from("submission").update({ name: title.trim() }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set link title. submission id: ${id}`);
  }
}
