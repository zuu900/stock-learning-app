-- CreateTable
CREATE TABLE "QuizChart" (
    "id" SERIAL NOT NULL,
    "tickerName" TEXT NOT NULL,
    "chartData" JSONB NOT NULL,
    "answer" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizChart_pkey" PRIMARY KEY ("id")
);
