create table "public"."submission" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text not null,
    "github_link" text,
    "evaluation_id" uuid not null,
    "description" json not null,
    "links" jsonb,
    "github_handle" text,
    "user_id" uuid,
    "is_submitted" boolean not null default false,
    "contract_id" text
);
alter table "public"."submission" enable row level security;
CREATE UNIQUE INDEX submission_pkey ON public.submission USING btree (id);
alter table "public"."submission" add constraint "submission_pkey" PRIMARY KEY using index "submission_pkey";
