import { ServerParams } from "..";

type Params = {
  id: string;
  newArr: any;
};

export async function setLink({ supabase, params: { id, newArr } }: ServerParams<Params>): Promise<void | Error> {
  const { data, error } = await supabase.from("submission").update({ links: newArr }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set link title. submission id: ${id}`);
  }
}
