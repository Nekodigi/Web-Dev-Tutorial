"use client";

import { Description } from "@/components/organisms/description";
import Image from "next/image";

export default function Home() {
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="このサイトについて"
        body={`
          このサイトは、難解なReact、Next.jsの機能を実際に動かしながら簡単に学べるように作られています。
          左のサイドバーから各機能の解説、動作デモ、サンプルコードを確認することができます。
          動作デモは全て触って動かせるようになっているので、実際に動かして動作を確認してみてください！
        `}
        withoutSample
      />
      <Description
        title="実際に動かすための手順"
        body={`
          Next.jsを使うのがおすすめです。
          以下のコマンドでプロジェクトを作成してください。質問は全てEnterでスキップしていただいても大丈夫です。
          npx create-next-app@latest
          /app/page.tsxを、サンプルコードに差し替えてください。
          以下のコマンドで開発サーバーを立ち上げてください。
          yarn run dev
        `}
        ref="https://nextjs.org/docs/app/getting-started/installation"
        withoutSample
      />
      <Description
        title="基礎知識が怪しい場合"
        body={`
          参照情報をクリックして、チートシートを確認してみてください。
          最低限必要な情報に絞っているため、発展的な内容を行いたい場合は、記載されている公式サイト等のリンクをよく確認してみてください。
          追記してほしい内容があれば、
          ndeji69@gmail.com又は、Discord : @Nekokazuまでご連絡ください！
        `}
        ref="https://cat-form-2c7.notion.site/158c8df8f8f98012afdcfd2208e32334?pvs=4"
        withoutSample
      />
    </div>
  );
}
