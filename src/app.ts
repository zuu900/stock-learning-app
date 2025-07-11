import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// ヘルスチェック用のAPIエンドポイント
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

// 学習コンテンツを全件取得するAPI
app.get("/api/lessons", async (req: Request, res: Response) => {
  try {
    const lessons = await prisma.stockLesson.findMany();
    res.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error); // エラーログを詳細化
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// 特定の学習コンテンツをIDで取得するAPI
app.get("/api/lessons/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const lessonId = parseInt(id, 10);

  if (isNaN(lessonId)) {
    res.status(400).json({ error: "Invalid ID format" });
    return;
  }

  try {
    const lesson = await prisma.stockLesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      res.status(404).json({ error: "Lesson not found" });
      return;
    }

    res.json(lesson);
  } catch (error) {
    console.error(`Error fetching lesson with id ${lessonId}:`, error); // エラーログを詳細化
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
});

// ランダムにクイズを1件取得するAPI
app.get("/api/quiz-charts/random", async (req: Request, res: Response) => {
  try {
    const quizCount = await prisma.quizChart.count();
    if (quizCount === 0) {
      return res.status(404).json({ error: "No quiz found" });
    }
    // ランダムな件数をスキップして1件取得
    const skip = Math.floor(Math.random() * quizCount);
    const quiz = await prisma.quizChart.findFirst({
      skip: skip,
    });
    res.json(quiz);
  } catch (error) {
    console.error("Error fetching random quiz:", error);
    res.status(500).json({ error: "Failed to fetch quiz" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
