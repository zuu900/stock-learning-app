import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // 既存のデータを全て削除
  await prisma.stockLesson.deleteMany();

  // 新しいデータを投入
  await prisma.stockLesson.createMany({
    data: [
      {
        title: "株式投資の第一歩：証券口座を開設しよう",
        content:
          "株式投資を始めるには、まず証券会社の口座が必要です。オンラインで簡単に申し込みができ、手数料や取扱商品で比較検討するのがポイントです。",
        category: "初心者",
      },
      {
        title: "【必須知識】NISAとiDeCoの違いとは？",
        content:
          "NISAは少額投資非課税制度、iDeCoは個人型確定拠出年金です。どちらも税制優遇のメリットがあり、目的に応じて使い分けることが重要です。",
        category: "初心者",
      },
      {
        title: "テクニカル分析入門：移動平均線を使ってみよう",
        content:
          "移動平均線は、一定期間の株価の平均値をグラフ化したものです。短期線と長期線のゴールデンクロスやデッドクロスは代表的な売買サインです。",
        category: "中級者",
      },
      {
        title: "ファンダメンタルズ分析：PERとPBRで割安株を探す",
        content:
          "PER（株価収益率）は株価の割安度、PBR（株価純資産倍率）は企業の資産価値から見た株価水準を示します。これらの指標を使って有望な企業を発掘します。",
        category: "中級者",
      },
      {
        title: "リスク管理の要：ポートフォリオの作り方",
        content:
          "ポートフォリオとは、株式、債券、不動産など、異なる値動きをする資産の組み合わせのことです。適切に分散投資することで、リスクを抑えながら安定したリターンを目指します。",
        category: "上級者",
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
