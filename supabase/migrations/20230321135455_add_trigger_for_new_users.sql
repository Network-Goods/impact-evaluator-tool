CREATE TRIGGER on_new_user AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();
set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$begin
  insert into public."user" (name, github_handle, github_user_id, role)
  values (new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'user_name', new.id, 'user');
  return new;
end;$function$
;
