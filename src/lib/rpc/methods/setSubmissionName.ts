import { ServerParams } from "..";

type Params = {
  id: string;
  name: string;
};

export async function setSubmissionName({
  supabase,
  params: { id, name },
}: ServerParams<Params>): Promise<void | Error> {
  const { error } = await supabase
    .from("submission")
    .update({ name: name })
    .eq("id", id);

  if (error) {
    console.error(error);
    return new Error(
      `ERROR -- failed to set submission name. submission id: ${id}`
    );
  }
}
