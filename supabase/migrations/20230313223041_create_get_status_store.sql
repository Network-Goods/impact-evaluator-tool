set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.get_status_store()
 RETURNS json
 LANGUAGE plpgsql
AS $function$begin
return json_agg(row_to_json(r)) from (select
	evaluation.name as name, 
	count(evaluator) as num_evaluators,
	count(CASE WHEN is_submitted THEN 1 END) as num_submitted,
	evaluation.status
from evaluation 
join evaluator 
on evaluation.id = evaluator.evaluation_id
join "user" on "user".id = evaluator.user_id
where "user".role != 'admin'
group by evaluation.id) as r;
end;$function$
;