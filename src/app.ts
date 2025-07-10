import express, { Request, Response } from "express";
// import { PrismaClient } from "@prisma/client"; // ← 一時的にコメントアウト

// const prisma = new PrismaClient(); // ← 一時的にコメントアウト
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));

// ヘルスチェック用のAPIエンドポイント
app.get("/health", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

// 学習コンテンツを全件取得するAPI（ダミーデータを返すように変更）
app.get("/api/lessons", async (req: Request, res: Response) => {
  // try {
  //   const lessons = await prisma.stockLesson.findMany();
  //   res.json(lessons);
  // } catch (error) {
  //   res.status(500).json({ error: "Failed to fetch lessons" });
  // }
  console.log("/api/lessons is called, returning dummy data.");
  res.json([
    {
      id: 1,
      title: "テストデータ1",
      content: "サーバーは起動しています",
      category: "デバッグ中",
    },
  ]);
});

// 特定の学習コンテンツをIDで取得するAPI（ダミーデータを返すように変更）
app.get("/api/lessons/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  // try {
  //   const lesson = await prisma.stockLesson.findUnique({
  //     where: { id: Number(id) },
  //   });
  //   if (!lesson) {
  //     return res.status(404).json({ error: "Lesson not found" });
  //   }
  //   res.json(lesson);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: "Failed to fetch lesson" });
  // }
  console.log(`/api/lessons/${id} is called, returning dummy data.`);
  res.json({
    id: Number(id),
    title: `テストデータ ${id}`,
    content: "詳細ページも表示できます",
    category: "デバッグ中",
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
