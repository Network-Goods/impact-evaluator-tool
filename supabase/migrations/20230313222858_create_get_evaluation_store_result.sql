set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.get_evaluation_store_result(evaluation_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
	declare _votes json;
	declare _evaluation json;
	declare _submissions json;
	declare _users json;
begin
	select json_agg(row_to_json(votes_row)) from (
		select evaluator_id, submission_id, votes
		from votes
		join evaluator on evaluator.id = votes.evaluator_id
		where evaluator.evaluation_id = get_evaluation_result_store.evaluation_id
	) votes_row
	into _votes;
	select row_to_json(evaluation_row)
	from (
		select *
		from evaluation 
		where id = get_evaluation_result_store.evaluation_id
		limit 1
	) evaluation_row
	into _evaluation;
	select json_agg(row_to_json(submission_rows)) 
	from (
		select *
		from submission
	 	where submission.evaluation_id = get_evaluation_result_store.evaluation_id
 	) submission_rows 
 	into _submissions;
	
	select json_agg(row_to_json(user_rows)) 
	from (
		select evaluator.id as evaluator_id, github_handle, voice_credits
		from "user"
		join evaluator on evaluator.user_id = "user".id
	 	where evaluator.evaluation_id = get_evaluation_result_store.evaluation_id
 	) user_rows 
 	into _users;
		
	return json_build_object(
		'evaluators', _users,
		'submissions', _submissions,
		'votes', _votes,
		'evaluation', _evaluation);
end;
$function$
;
