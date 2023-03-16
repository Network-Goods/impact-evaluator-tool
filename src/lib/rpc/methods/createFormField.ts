import { isAdmin, ServerParams } from "..";

type Params = {
  formField: any;
};

export async function createFormField({
  supabase,
  params: { formField },
  auth,
}: ServerParams<Params>): Promise<any | Error> {
  if (!isAdmin(auth)) {
    return new Error(`Unauthorized`);
  }

  const { data, error } = await supabase.from("evaluation_field").insert([formField]);

  if (error) {
    console.error(error);
    return new Error(`ERROR -- failed to insert form field.`);
  }
}
