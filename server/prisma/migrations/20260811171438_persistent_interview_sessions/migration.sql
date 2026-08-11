-- AlterTable
ALTER TABLE "public"."InterviewSession" ADD COLUMN     "resumeId" INTEGER,
ALTER COLUMN "overallScore" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "public"."Resume" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true;

-- AddForeignKey
ALTER TABLE "public"."InterviewSession" ADD CONSTRAINT "InterviewSession_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "public"."Resume"("id") ON DELETE SET NULL ON UPDATE CASCADE;
