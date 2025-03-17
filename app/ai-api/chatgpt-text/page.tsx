"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import Link from "next/link";
import { use, useEffect, useMemo, useRef, useState } from "react";

const code = `
//! 複数ファイルに分かれているため、コードをコピーする際は注意してください。
// #start /.env.local
OPENAI_API_KEY=自分のAPIキーで置き換え
// #end

// #start /app/api/ai-api/chatgpt-text/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get("input");
  if (!input)
    return Response.json({ error: "input is required" }, { status: 400 });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: input,
      },
    ],
  });
  const output = completion.choices[0].message.content;
  return Response.json({ output });
}
// #end

// #start /page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("こんにちは！");
  const [output, setOutput] = useState("");

  const ask = async () => {
    if (!input) return;
    const res = await fetch("/api/ai-api/chatgpt-text?input="+input);
    const json = await res.json();
    setOutput(json.output);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力..."
          className="border  w-full"
        />
        <button onClick={() => ask()} className="underline">
          質問する
        </button>
        <p>{output}</p>
      </div>
    </div>
  );
}
// #end
`;

export default function Page() {
  const [input, setInput] = useState("こんにちは！");
  const [output, setOutput] = useState("");

  const ask = async () => {
    if (!input) return;
    const res = await fetch("/api/ai-api/chatgpt-text?input=" + input);
    const json = await res.json();
    setOutput(json.output);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="文章生成 - ChatGPT API"
        body={`※従量課金制のAPIキーが必要です。
          APIを使ってAIを利用する場合、ブラウザに負荷をかけずに高度な処理を行うことができ、実装も簡単になります。
          課金単価はAIによって大きく異なるため、必ず料金体系を確認することをお勧めします。
          ChatGPT 4o-miniの場合、100万文字出力あたり100円程で使うことができます。
          プロンプト次第で、翻訳など様々な機能を持たせることができます。
          実行には以下のライブラリが必要です。
          pnpm add openai
          また、環境変数 - .envの章を参考に、OPENAI_API_KEYという名前でAPIキーを環境変数に保存してください。
        `}
        url="https://platform.openai.com/docs/guides/text"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力..."
          className="border  w-full"
        />
        <button onClick={() => ask()} className="underline">
          質問する
        </button>
        <p>{output}</p>
      </div>
      <Code text={code} />
    </div>
  );
}
