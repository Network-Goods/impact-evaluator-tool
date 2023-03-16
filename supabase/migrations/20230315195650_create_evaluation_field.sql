create table "public"."evaluation_field" (
    "id" uuid not null,
    "evaluation_id" uuid,
    "heading" text,
    "subheading" text,
    "char_count" integer,
    "placeholder" text
);
CREATE UNIQUE INDEX evaluation_field_pkey ON public.evaluation_field USING btree (id);
alter table "public"."evaluation_field" add constraint "evaluation_field_pkey" PRIMARY KEY using index "evaluation_field_pkey";
alter table "public"."evaluation_field" add constraint "evaluation_field_evaluation_id_fkey" FOREIGN KEY (evaluation_id) REFERENCES evaluation(id) not valid;
alter table "public"."evaluation_field" validate constraint "evaluation_field_evaluation_id_fkey";