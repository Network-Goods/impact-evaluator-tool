-- CreateTable
CREATE TABLE "evaluation" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "description" TEXT DEFAULT '',
    "start_time" TIMESTAMPTZ(6),
    "end_time" TIMESTAMPTZ(6),
    "form_description" TEXT,

    CONSTRAINT "evaluation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluation_field" (
    "id" UUID NOT NULL,
    "evaluation_id" UUID,
    "heading" TEXT,
    "subheading" TEXT,
    "char_count" INTEGER,
    "placeholder" TEXT,
    "field_order" INTEGER,

    CONSTRAINT "evaluation_field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "evaluator" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "evaluation_id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "voice_credits" INTEGER,
    "is_submitted" BOOLEAN NOT NULL DEFAULT false,
    "is_sme" BOOLEAN,
    "code" TEXT,

    CONSTRAINT "evaluator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invitation" (
    "id" UUID NOT NULL,
    "evaluation_id" UUID NOT NULL,
    "code" TEXT,
    "voice_credits" INTEGER,
    "remaining_uses" INTEGER NOT NULL,
    "is_sme" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "invitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "github_link" TEXT,
    "evaluation_id" UUID NOT NULL,
    "description" JSON NOT NULL,
    "links" JSONB,
    "github_handle" TEXT,
    "user_id" UUID,
    "is_submitted" BOOLEAN NOT NULL DEFAULT false,
    "contract_id" TEXT,

    CONSTRAINT "submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "submission_field" (
    "id" UUID NOT NULL,
    "fields_id" UUID,
    "field_body" TEXT,
    "submission_id" UUID,

    CONSTRAINT "submission_field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT,
    "email" TEXT,
    "github_handle" TEXT,
    "invite_status" TEXT,
    "preferred_email" TEXT,
    "github_user_id" UUID,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "votes" (
    "evaluator_id" UUID NOT NULL,
    "submission_id" UUID NOT NULL,
    "votes" INTEGER NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("evaluator_id","submission_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "evaluator_id_key" ON "evaluator"("id");

-- AddForeignKey
ALTER TABLE "evaluation_field" ADD CONSTRAINT "evaluation_field_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evaluator" ADD CONSTRAINT "evaluator_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "evaluator" ADD CONSTRAINT "evaluator_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "invitation" ADD CONSTRAINT "invitation_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "submission" ADD CONSTRAINT "submission_evaluation_id_fkey" FOREIGN KEY ("evaluation_id") REFERENCES "evaluation"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "submission_field" ADD CONSTRAINT "submission_field_fields_id_fkey" FOREIGN KEY ("fields_id") REFERENCES "evaluation_field"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "submission_field" ADD CONSTRAINT "submission_field_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_evaluator_id_fkey" FOREIGN KEY ("evaluator_id") REFERENCES "evaluator"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_submission_id_fkey" FOREIGN KEY ("submission_id") REFERENCES "submission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

