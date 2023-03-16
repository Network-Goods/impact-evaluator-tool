set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.get_round_details_store(user_id uuid, evaluation_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$declare _submissions json;
declare _evaluation json;
begin
	select json_agg(row_to_json(submission_rows)) 
	from (
		select *, (
			select json_agg(row_to_json(fields))
			from (
				select
					submission_field.id as submission_field_id,
					field_body,
					submission_field.fields_id as field_id,
					heading,
					subheading,
					char_count,
					placeholder
				from submission_field
				join evaluation_field on evaluation_field.id = submission_field.fields_id
				where submission_id = submission.id
			) as fields
		) as fields
		from submission
	 	where submission.evaluation_id = get_round_details_store.evaluation_id
			and submission.user_id = get_round_details_store.user_id
 	) as submission_rows 
 	into _submissions;
	
	select json_agg(row_to_json(evaluation_rows)) 
	from (
		select *
		from evaluation
	 	where evaluation.id = get_round_details_store.evaluation_id
 	) evaluation_rows 
 	into _evaluation;
	return json_build_object(
		'submissions', _submissions,
		'evaluation', _evaluation
);
end$function$
;
