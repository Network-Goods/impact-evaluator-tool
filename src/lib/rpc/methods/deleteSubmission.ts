import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
};

export async function deleteSubmission({
  supabase,
  params: { id },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  // TODO: Fix this ASAP
  // if (!isAdmin(auth)) {
  //   return new Error(`Unauthorized`);
  // }

  const { error } = await supabase.from("submission").delete().eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to delete submission. submission id: ${id}`);
  }
}
