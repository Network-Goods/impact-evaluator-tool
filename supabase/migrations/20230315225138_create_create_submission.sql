set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.create_submission(id uuid, name text, github_link text, evaluation_id uuid, description json, links json, github_handle text, user_id uuid)
 RETURNS json
 LANGUAGE plpgsql
AS $function$
declare
	_new_submission submission%rowtype;
	_new_submission_fields json;
begin
	insert 
		into submission (
			id, name, github_link, evaluation_id, description, links, github_handle, is_submitted, user_id
		) values (
		    id, name, github_link, evaluation_id, description, links, github_handle, false, user_id
		)
		returning * into _new_submission;
		
	insert
		into submission_field (
			id, fields_id, field_body, submission_id
		)
		select uuid_generate_v4(), evaluation_field.id, '', create_submission.id
		from evaluation_field
		where evaluation_field.evaluation_id = create_submission.evaluation_id;
		
	select json_agg(row_to_json(submission_field_rows)) from (
		select * from submission_field where submission_id = create_submission.id
	) submission_field_rows
	into _new_submission_fields;
		
	return json_build_object(
		'submission', row_to_json(_new_submission),
		'fields', _new_submission_fields
	);
end;
$function$
;
