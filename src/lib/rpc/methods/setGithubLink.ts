import { ServerParams } from "..";

type Params = {
  link: string;
  id: string;
};

export async function setGithubLink({ supabase, params: { link, id } }: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase.from("submission").update({ github_link: link }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set github link. submission id: ${id}`);
  }
}
