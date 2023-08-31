/*
  Warnings:

  - Made the column `description` on table `evaluation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "evaluation" ALTER COLUMN "description" SET NOT NULL;

-- AlterTable
ALTER TABLE "invitation" ALTER COLUMN "remaining_uses" SET DEFAULT 100;
