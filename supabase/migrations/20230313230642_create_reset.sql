set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.reset(in_evaluator_id uuid)
 RETURNS void
 LANGUAGE plpgsql
AS $function$begin
  update votes
  set votes = 0
  where evaluator_id = in_evaluator_id;
end;$function$
;