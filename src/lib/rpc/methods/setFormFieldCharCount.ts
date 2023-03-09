import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  char_count: string;
};

export async function setFormFieldCharCount({
  supabase,
  params: { id, char_count },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("evaluation_field").update({ char_count: char_count }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set form field character count. evaluation id: ${id}`);
  }
}
