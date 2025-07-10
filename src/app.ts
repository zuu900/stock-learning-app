import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client"; // PrismaClientをインポート

const prisma = new PrismaClient(); // PrismaClientのインスタンスを作成
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// 【新規追加】学習コンテンツを全件取得するAPIエンドポイント
app.get("/api/lessons", async (req: Request, res: Response) => {
  try {
    const lessons = await prisma.stockLesson.findMany(); // DBから全件取得
    res.json(lessons); // JSON形式で返す
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch lessons" });
  }
});

app.get("/api/lessons/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const lesson = await prisma.stockLesson.findUnique({
      where: { id: Number(id) }, // URLのidを使って一件だけ検索
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
