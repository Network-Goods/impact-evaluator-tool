set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.get_dashboard_store(user_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$begin
	
		return
		coalesce(json_agg(row_to_json(evaluation_rows)), '[]'::json)
		from (
			select evaluation.*, evaluator.is_submitted
		from evaluation
		join evaluator
		on evaluation.id = evaluator.evaluation_id
		where evaluator.user_id = get_dashboard_store.user_id) as evaluation_rows;
end;
$function$
;
