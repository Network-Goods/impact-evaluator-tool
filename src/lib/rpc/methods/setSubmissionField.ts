import { ServerParams } from "..";

type Params = {
  id: string;
  value: string;
};

export async function setSubmissionField({
  supabase,
  params: { id, value },
}: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase.from("submission_field").update({ field_body: value }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set submission field. submission id: ${id}`);
  }
}
