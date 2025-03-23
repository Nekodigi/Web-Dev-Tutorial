export const maxDuration = 60;

("use client");

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import Link from "next/link";
import { use, useEffect, useMemo, useRef, useState } from "react";

const code = `
//! 複数ファイルに分かれているため、コードをコピーする際は注意してください。
// #start /app/api/ai-api/chatgpt-text/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get("input");
  const apiKey = searchParams.get("apiKey");
  if (!input || !apiKey)
    return Response.json(
      { error: "input and apiKey is required" },
      { status: 400 }
    );
  const openai = new OpenAI({ apiKey });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  const output = response.data[0].url;
  return Response.json({ output });
}
// #end

// #start /page.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

export default function Page() {
  const [input, setInput] = useState("猫の画像");
  const [apiKey, setApiKey] = useState("");
  const [output, setOutput] = useState("");

  const generate = async () => {
    if (!input) return;
    const res = await fetch(
      "/api/ai-api/dalle?input=" + input + "&apiKey=" + apiKey
    );
    const json = await res.json();
    setOutput(json.output);
  };

  return (
    <div className="flex flex-col gap-4 items-end w-96 items-center">
      <input
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="APIキー"
        className="border  w-full"
      />
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="生成したい画像の説明を入力..."
        className="border  w-full"
      />
      <button onClick={() => generate()} className="underline">
        生成する
      </button>
      {output && <img src={output} alt="生成画像" />}
    </div>
  );
}
// #end
`;

export default function Page() {
  const [input, setInput] = useState("猫の画像");
  const [apiKey, setApiKey] = useState("");
  const [output, setOutput] = useState("");

  const generate = async () => {
    if (!input) return;
    const res = await fetch(
      "/api/ai-api/dalle?input=" + input + "&apiKey=" + apiKey
    );
    const json = await res.json();
    setOutput(json.output);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="画像生成 - DALLE"
        body={`※従量課金制のAPIキーが必要です。
          ※一枚当たり6円と生成コストが高いので、自分のAPIキーを使ってください。
          実行には以下のライブラリが必要です。
          pnpm add openai
        `}
        url="https://platform.openai.com/docs/guides/image-generation"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <input
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="APIキー"
          className="border  w-full"
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="生成したい画像の説明を入力..."
          className="border  w-full"
        />
        <button onClick={() => generate()} className="underline">
          生成する
        </button>
        {output && <img src={output} alt="生成画像" />}
      </div>
      <Code text={code} />
    </div>
  );
}
