create table "public"."evaluation" (
    "id" uuid not null default uuid_generate_v4(),
    "name" text,
    "status" text not null default 'draft'::text,
    "description" text,
    "start_time" timestamp with time zone,
    "end_time" timestamp with time zone
);
alter table "public"."evaluation" enable row level security;
CREATE UNIQUE INDEX evaluation_pkey ON public.evaluation USING btree (id);
alter table "public"."evaluation" add constraint "evaluation_pkey" PRIMARY KEY using index "evaluation_pkey";
