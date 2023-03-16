import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  placeholder: string;
};

export async function setFormFieldPlaceholder({
  supabase,
  params: { id, placeholder },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("evaluation_field").update({ placeholder: placeholder }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set form field placeholder. evaluation id: ${id}`);
  }
}
