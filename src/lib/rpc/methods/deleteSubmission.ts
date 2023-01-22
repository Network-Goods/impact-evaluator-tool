import { ServerParams } from "..";

type Params = {
  id: string;
};

export async function deleteSubmission({ supabase, params: { id } }: ServerParams<Params>): Promise<void | Error> {
  const { error } = await supabase.from("submission").delete().eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to delete submission. submission id: ${id}`);
  }
}
