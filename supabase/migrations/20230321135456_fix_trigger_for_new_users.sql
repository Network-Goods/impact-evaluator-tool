set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 security definer
AS $function$begin
  insert into public."user" (name, github_handle, github_user_id, role)
  values (new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'user_name', new.id, 'user');
  return new;
end;$function$
;