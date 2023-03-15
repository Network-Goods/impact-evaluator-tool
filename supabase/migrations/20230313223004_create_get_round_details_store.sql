set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.get_round_details_store(user_id uuid, evaluation_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$declare _submissions json;
begin
	select json_agg(row_to_json(submission_rows)) 
	from (
		select *
		from submission
	 	where submission.evaluation_id = get_round_details_store.evaluation_id
			and submission.user_id = get_round_details_store.user_id
 	) submission_rows 
 	into _submissions;
	return json_build_object(
		'submissions', _submissions);
end$function$
;