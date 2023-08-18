-- FUNCTION: public.get_voting_store(uuid, uuid)

-- DROP FUNCTION IF EXISTS public.get_voting_store(uuid, uuid);

CREATE OR REPLACE FUNCTION public.get_submissions(
	in_evaluation_id uuid)
    RETURNS json
    LANGUAGE 'plpgsql'
AS $BODY$
	declare _submissions json;
begin
	
	select json_agg(row_to_json(submission_rows)) 
	from (
		select submission.name as project_name,
  "user".github_handle as submitter_github,
  "user".preferred_email as submitter_email,
  submission.github_handle as representative_github,
		is_submitted, (
			select json_agg(row_to_json(fields))
			from (
				select
					submission_field.id as submission_field_id,
					field_body,
					submission_field.fields_id as field_id,
					heading,
					subheading,
					char_count,
					placeholder,
					field_order
				from submission_field
				join evaluation_field on evaluation_field.id = submission_field.fields_id
				where submission_id = submission.id
				order by field_order asc
			) as fields
		) as fields
		from submission
		join "user" on "user".id = submission.user_id
	 	where evaluation_id = in_evaluation_id
 	) submission_rows 
 	into _submissions;
 
	
		return json_build_object(
		'submissions', _submissions);
end;
$BODY$;
