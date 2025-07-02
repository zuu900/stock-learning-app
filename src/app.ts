import express, { Request, Response } from "express";

// Expressアプリを作成
const app = express();
const port = process.env.PORT || 3000; // Renderが指定するポート、なければ3000番を使う

// 'public'フォルダ内の静的ファイル（HTML, CSSなど）を配信する設定
app.use(express.static("public"));

// ルートURL ('/') にアクセスがあった場合にテキストを返す
app.get("/api/hello", (req: Request, res: Response) => {
  res.send("Hello from server!");
});

// サーバーを指定したポートで起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
