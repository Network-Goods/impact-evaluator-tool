create table "public"."invitation" (
    "id" uuid not null,
    "evaluation_id" uuid not null,
    "code" text not null,
    "voice_credits" bigint not null,
    "remaining_uses" bigint not null default '100'::bigint,
    "is_sme" boolean not null default false
);
alter table "public"."invitation" enable row level security;
CREATE UNIQUE INDEX invitation_pkey ON public.invitation USING btree (id);
alter table "public"."invitation" add constraint "invitation_pkey" PRIMARY KEY using index "invitation_pkey";
alter table "public"."invitation" add constraint "invitation_evaluation_id_fkey" FOREIGN KEY (evaluation_id) REFERENCES evaluation(id) not valid;
alter table "public"."invitation" validate constraint "invitation_evaluation_id_fkey";
