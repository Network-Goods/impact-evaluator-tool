set check_function_bodies = off;
CREATE OR REPLACE FUNCTION public.join_with_code(user_id uuid, code text, preferred_email text)
 RETURNS json
 LANGUAGE plpgsql
AS $function$declare 
	_invite invitation%rowtype;
	_new_evaluator evaluator%rowtype;
	_new_submission submission%rowtype;
	_github_handle text;
	_submission_id uuid := gen_random_uuid();
begin
	select * from invitation where invitation.code = join_with_code.code into _invite;
	
	if _invite is null then
		return json_build_object('error', 'Invalid invite code. code: ' || join_with_code.code);
	end if;
	
	if exists 
		(select 1
		 from evaluator
		 where evaluation_id = _invite.evaluation_id
		 and evaluator.user_id = join_with_code.user_id
	) then
		return json_build_object('error', 'User has already joined this round');
	end if;
	
	if _invite.remaining_uses <= 0 then
		return json_build_object('error', 'Code has been used too many times, please contact support');
	end if;
	
	select * 
	into _new_evaluator 
	from (
		values ( _invite.evaluation_id, join_with_code.user_id, _invite.voice_credits, gen_random_uuid(), false, _invite.is_sme, join_with_code.code)
	) as t;
	
	update "user" set preferred_email = join_with_code.preferred_email where id = join_with_code.user_id;
	insert into evaluator select _new_evaluator.*;
			
	update invitation
	set remaining_uses = remaining_uses - 1
	where id = _invite.id;
	
	if _invite.is_sme = true then
		return null;
	end if;
	
	select github_handle
	into _github_handle
	from "user"
	where id = join_with_code.user_id;
	

	-- TODO: should maybe call create_submission? We should minimize the number of places we are creating new submissions
	select * 
	into _new_submission 
	from (
		values (_submission_id, '', '', _invite.evaluation_id, '{}', '[]', _github_handle, false, join_with_code.user_id)
	) as t;
	
	insert into submission select _new_submission.*;
	
	insert
		into submission_field (
			id, fields_id, field_body, submission_id
		)
		select uuid_generate_v4(), evaluation_field.id, '', _submission_id
		from evaluation_field
		where evaluation_field.evaluation_id = _invite.evaluation_id;
	
	return json_build_object(
		'evaluationID', _invite.evaluation_id,
		'submission', row_to_json(_new_submission)
	);
end;
$function$
;
