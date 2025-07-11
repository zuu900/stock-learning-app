import express from "express"; // Request, Responseを一旦外す
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// ★★★ 型指定を any に変更 ★★★
app.get("/health", (req: any, res: any) => {
  res.status(200).send("OK");
});

// ★★★ 型指定を any に変更 ★★★
app.get("/api/lessons", async (req: any, res: any) => {
  try {
    const lessons = await prisma.stockLesson.findMany();
    res.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// ★★★ 型指定を any に変更 ★★★
app.get("/api/lessons/:id", async (req: any, res: any) => {
  const { id } = req.params;
  try {
    const lesson = await prisma.stockLesson.findUnique({
      where: { id: Number(id) },
    });
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }
    res.json(lesson);
  } catch (error) {
    console.error(`Error fetching lesson with id ${id}:`, error);
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
});

// ★★★ 型指定を any に変更 ★★★
app.get("/api/quiz-charts/random", async (req: any, res: any) => {
  try {
    const quizCount = await prisma.quizChart.count();
    if (quizCount === 0) {
      return res.status(404).json({ error: "No quiz found" });
    }
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
