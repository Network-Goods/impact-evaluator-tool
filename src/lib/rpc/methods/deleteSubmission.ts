import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
};

export async function deleteSubmission({
  supabase,
  params: { id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  let { data, error: error1 } = await supabase.from("submission").select("user_id").eq("id", id).single();

  if (!data || error1) {
    return new Error("Failed to get user_id for auth");
  }

  if (!isAdmin(auth) && data.user_id != auth.user_id) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("submission").delete().eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to delete submission. submission id: ${id}`);
  }
}
