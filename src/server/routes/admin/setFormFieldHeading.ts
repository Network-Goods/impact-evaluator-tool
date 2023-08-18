import { isAdmin, ServerParams } from "../..";

type Params = {
  id: string;
  heading: string;
};

export async function setFormFieldHeading({
  supabase,
  params: { id, heading },
  auth,
}: ServerParams<Params>): Promise<void | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { error } = await supabase.from("evaluation_field").update({ heading: heading }).eq("id", id);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to set form field heading. evaluation id: ${id}`);
  }
}
