import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
};

export async function setSubmission({ supabase, params: { id }, auth }: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("submission").update({ is_submitted: true }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set submission. submission id: ${id}`);
  }
}
