"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";

const code = `"use client";

import { useState } from "react";

export default function Page() {
  const [text, setText] = useState("");
  const [render, setRender] = useState("山田");

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {render}さん、よろしくお願いします！
        </h3>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="お名前を入力"
        />
        <Button onClick={() => setRender(text)}>値を確定</Button>
      </div>
    </div>
  );
}

`;

export default function Page() {
  const [text, setText] = useState("");
  const [render, setRender] = useState("山田");

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="基本要素 - button/input"
        body={`Shadcnはカスタマイズ性が高く、動作も軽量なため、人気のあるUIフレームワークです。本サイトもShadcnを利用して作成されています。
        通常のHTML要素を置き換えるだけで、簡単にShadcnのコンポーネントを利用できます。
        利用する前には、以下のコマンドで初期化を行った上で
        npx shadcn@latest init
        次のようなコマンドを使って必要な要素を随時追加する必要があることに注意してください。
        npx shadcn@latest add button
        `}
        url="https://ui.shadcn.com/docs/installation/next"
        urlDesc="公式インストールガイド"
      />
      <div className="flex flex-col gap-4 items-end">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          {render}さん、よろしくお願いします！
        </h3>
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="お名前を入力"
        />
        <Button onClick={() => setRender(text)}>値を確定</Button>
      </div>
      <Code text={code} />
    </div>
  );
}
