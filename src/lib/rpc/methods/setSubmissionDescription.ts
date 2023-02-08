import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  newObj: any;
};

export async function setSubmissionDescription({
  supabase,
  params: { id, newObj },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.from("submission").update({ description: newObj }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set link title. submission id: ${id}`);
  }
}
