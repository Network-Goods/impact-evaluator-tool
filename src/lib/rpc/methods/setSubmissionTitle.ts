import { ServerParams } from "..";

type Params = {
  id: string;
  title: string;
};

export async function setSubmissionTitle({
  supabase,
  params: { id, title },
}: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase.from("submission").update({ name: title }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set link title. submission id: ${id}`);
  }
}
