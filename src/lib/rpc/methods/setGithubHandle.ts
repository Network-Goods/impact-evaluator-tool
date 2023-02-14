import { ServerParams } from "..";

type Params = {
  id: string;
  github_handle: string;
};

export async function setGithubHandle({
  supabase,
  params: { id, github_handle },
}: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase.from("submission").update({ github_handle: github_handle }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set github handle. submission id: ${id}`);
  }
}
