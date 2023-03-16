create table "public"."votes" (
    "evaluator_id" uuid not null,
    "submission_id" uuid not null,
    "votes" bigint not null
);
alter table "public"."votes" enable row level security;
alter table "public"."votes" add constraint "votes_evaluator_id_fkey" FOREIGN KEY (evaluator_id) REFERENCES evaluator(id) not valid;
alter table "public"."votes" validate constraint "votes_evaluator_id_fkey";
alter table "public"."votes" add constraint "votes_submission_id_fkey" FOREIGN KEY (submission_id) REFERENCES submission(id) not valid;
alter table "public"."votes" validate constraint "votes_submission_id_fkey";
