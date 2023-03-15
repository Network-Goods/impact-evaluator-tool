CREATE OR REPLACE FUNCTION public.is_user_evaluator(in_user_id uuid, in_evaluator_id uuid)
 RETURNS boolean
 LANGUAGE plpgsql
AS $function$begin
RETURN (
	EXISTS (
		SELECT 1 
		FROM evaluator 
		WHERE ((evaluator.id = is_user_evaluator.in_evaluator_id)
			   AND (evaluator.user_id = is_user_evaluator.in_user_id))));
end;$function$
;