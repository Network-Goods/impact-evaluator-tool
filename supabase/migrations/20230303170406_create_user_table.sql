create table "public"."user" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text,
    "email" text,
    "github_handle" text,
    "invite_status" text,
    "preferred_email" text,
    "github_user_id" uuid,
    "role" text not null default 'user'::text
);
alter table "public"."user" enable row level security;
CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);
alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";
