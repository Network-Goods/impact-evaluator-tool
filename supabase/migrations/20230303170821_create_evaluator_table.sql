create table "public"."evaluator" (
    "id" uuid not null default uuid_generate_v4(),
    "evaluation_id" uuid not null,
    "user_id" uuid not null,
    "voice_credits" bigint,
    "is_submitted" boolean not null default false
);
alter table "public"."evaluator" enable row level security;
CREATE UNIQUE INDEX evaluator_id_key ON public.evaluator USING btree (id);
CREATE UNIQUE INDEX evaluator_pkey ON public.evaluator USING btree (id);
alter table "public"."evaluator" add constraint "evaluator_pkey" PRIMARY KEY using index "evaluator_pkey";
alter table "public"."evaluator" add constraint "evaluator_evaluation_id_fkey" FOREIGN KEY (evaluation_id) REFERENCES evaluation(id) not valid;
alter table "public"."evaluator" validate constraint "evaluator_evaluation_id_fkey";
alter table "public"."evaluator" add constraint "evaluator_id_key" UNIQUE using index "evaluator_id_key";
alter table "public"."evaluator" add constraint "evaluator_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) not valid;
alter table "public"."evaluator" validate constraint "evaluator_user_id_fkey";
