create table "public"."submission_field" (
    "id" uuid not null,
    "fields_id" uuid,
    "field_body" text,
    "submission_id" uuid
);
CREATE UNIQUE INDEX submission_field_pkey ON public.submission_field USING btree (id);
alter table "public"."submission_field" add constraint "submission_field_pkey" PRIMARY KEY using index "submission_field_pkey";
alter table "public"."submission_field" add constraint "submission_field_fields_id_fkey" FOREIGN KEY (fields_id) REFERENCES evaluation_field(id) not valid;
alter table "public"."submission_field" validate constraint "submission_field_fields_id_fkey";
alter table "public"."submission_field" add constraint "submission_field_submission_id_fkey" FOREIGN KEY (submission_id) REFERENCES submission(id) not valid;
alter table "public"."submission_field" validate constraint "submission_field_submission_id_fkey";