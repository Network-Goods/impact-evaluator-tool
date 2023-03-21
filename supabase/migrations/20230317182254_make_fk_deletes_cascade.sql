alter table public.votes
drop constraint votes_submission_id_fkey,
add constraint votes_submission_id_fkey
  foreign key (submission_id)
  references submission(id)
  on delete cascade;

alter table public.votes
drop constraint votes_evaluator_id_fkey,
add constraint votes_evaluator_id_fkey
  foreign key (evaluator_id)
  references evaluator(id)
  on delete cascade;

alter table public.evaluator
drop constraint evaluator_evaluation_id_fkey,
add constraint evaluator_evaluation_id_fkey
  foreign key (evaluation_id)
  references evaluation(id)
  on delete cascade;

alter table public.evaluator
drop constraint evaluator_user_id_fkey,
add constraint evaluator_user_id_fkey
  foreign key (user_id)
  references "user"(id)
  on delete cascade;

alter table public.invitation
drop constraint invitation_evaluation_id_fkey,
add constraint invitation_evaluation_id_fkey
  foreign key (evaluation_id)
  references evaluation(id)
  on delete cascade;

alter table public.submission
drop constraint submission_evaluation_id_fkey,
add constraint submission_evaluation_id_fkey
  foreign key (evaluation_id)
  references evaluation(id)
  on delete cascade;

alter table public.evaluation_field
drop constraint evaluation_field_evaluation_id_fkey,
add constraint evaluation_field_evaluation_id_fkey
  foreign key (evaluation_id)
  references evaluation(id)
  on delete cascade;

alter table public.submission_field
drop constraint submission_field_fields_id_fkey,
add constraint submission_field_fields_id_fkey
  foreign key (fields_id)
  references evaluation_field(id)
  on delete cascade;

alter table public.submission_field
drop constraint submission_field_submission_id_fkey,
add constraint submission_field_submission_id_fkey
  foreign key (submission_id)
  references submission(id)
  on delete cascade;