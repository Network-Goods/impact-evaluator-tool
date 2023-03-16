alter table "public"."submission" add constraint "submission_evaluation_id_fkey" FOREIGN KEY (evaluation_id) REFERENCES evaluation(id) not valid;

alter table "public"."submission" validate constraint "submission_evaluation_id_fkey";


