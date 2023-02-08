import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  github_handle: string;
};

export async function setGithubHandle({
  supabase,
  params: { id, github_handle },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.from("submission").update({ github_handle: github_handle }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set github handle. submission id: ${id}`);
  }
}
