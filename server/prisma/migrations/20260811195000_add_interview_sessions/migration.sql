-- CreateTable
CREATE TABLE "InterviewSession" (
    "id" SERIAL NOT NULL,
    "overallScore" DOUBLE PRECISION NOT NULL,
    "report" JSONB NOT NULL,
    "questions" JSONB NOT NULL,
    "answers" JSONB NOT NULL,
    "evaluations" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "InterviewSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "InterviewSession"
ADD CONSTRAINT "InterviewSession_userId_fkey"
FOREIGN KEY ("userId") REFERENCES "User"("id")
ON DELETE CASCADE
ON UPDATE CASCADE;

-- CreateIndex
CREATE INDEX "InterviewSession_userId_createdAt_idx"
ON "InterviewSession"("userId", "createdAt");
