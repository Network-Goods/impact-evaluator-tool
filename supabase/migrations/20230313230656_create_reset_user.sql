set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.reset_user(github_handle_or_email text)
 RETURNS void
 LANGUAGE plpgsql
AS $function$begin
delete 
from submission
using "user" 
where submission.user_id = "user".id
  and ("user".github_handle = reset_user.github_handle_or_email
    or "user".preferred_email = reset_user.github_handle_or_email);
delete 
from evaluator
using "user"
where evaluator.user_id = "user".id 
  and ("user".github_handle = reset_user.github_handle_or_email
    or "user".preferred_email = reset_user.github_handle_or_email);
end;$function$
;