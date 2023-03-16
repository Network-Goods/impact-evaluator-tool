import { isAdmin, ServerParams } from "..";

type Params = {
  id: string;
  subheading: string;
};

export async function setFormFieldSubheading({
  supabase,
  params: { id, subheading },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("evaluation_field").update({ subheading: subheading }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set form field subheading. evaluation id: ${id}`);
  }
}
