import { ServerParams } from "..";

type Params = {
  id: string;
  newObj: any;
};

export async function setSubmissionDescription({
  supabase,
  params: { id, newObj },
}: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase.from("submission").update({ description: newObj }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set link title. submission id: ${id}`);
  }
}
