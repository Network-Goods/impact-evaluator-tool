set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.get_voting_store(in_user_id uuid, in_evaluation_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$	declare _submissions json;
	declare _evaluator json;
	declare _votes json;
	declare _evaluation json;
begin
	select row_to_json(evaluator_row)
	from (
		select id, voice_credits 
		from evaluator 
		where evaluator.user_id = in_user_id
		and evaluator.evaluation_id = in_evaluation_id
		limit 1
	) evaluator_row
	into _evaluator;
	
	if _evaluator->'id' is null then
		raise exception'User is not assigned as evaluator for evaluation. evaluation_id: %', in_evaluation_id;
	end if;
	
	select row_to_json(evaluation_row)
	from (
		select *
		from evaluation 
		where id = in_evaluation_id
		limit 1
	) evaluation_row
	into _evaluation;
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
	 	where evaluation_id = in_evaluation_id
 	) submission_rows 
 	into _submissions;
 
	select json_object_agg(votes.submission_id, votes.votes)
	from votes 
	where votes.evaluator_id = (_evaluator->>'id')::uuid
	and votes.submission_id in (
		select id
		from submission
		where submission.evaluation_id = in_evaluation_id)
	into _votes;
		
	return json_build_object(
		'evaluator', _evaluator,
		'submissions', _submissions,
		'votes', _votes,
		'evaluation', _evaluation);
end;
$function$
;