import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// ▼▼▼▼▼【ここに追加】▼▼▼▼▼
// ヘルスチェック用のAPIエンドポイントを追加
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});
// ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲

// 学習コンテンツを全件取得するAPI
app.get("/api/lessons", async (req: Request, res: Response) => {
  try {
    const lessons = await prisma.stockLesson.findMany();
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

// 特定の学習コンテンツをIDで取得するAPI
app.get("/api/lessons/:id", async (req: Request, res: Response) => {
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
    console.error(error);
    res.status(500).json({ error: "Failed to fetch lesson" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
