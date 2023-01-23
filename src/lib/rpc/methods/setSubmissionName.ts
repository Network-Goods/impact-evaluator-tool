import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  name: string;
};

export async function setSubmissionName({
  supabase,
  params: { id, name },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error("Unauthorized");
  }

  const { error } = await supabase.from("submission").update({ name: name }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set submission name. submission id: ${id}`);
  }
}
