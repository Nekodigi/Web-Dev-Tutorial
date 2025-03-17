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

// #start /app/api/ai-api/chatgpt-multimodal/route.ts
import { NextRequest } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get("input");
  const inputImage = searchParams.get("inputImage");
  if (!input || !inputImage)
    return Response.json({ error: "input is required" }, { status: 400 });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: input },
          {
            type: "image_url",
            image_url: {
              url: inputImage,
            },
          },
        ],
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
  const [input, setInput] = useState("画像に移っている物体は何ですか?");
  const [inputImage, setInputImage] = useState(
    "https://fastly.picsum.photos/id/237/300/200.jpg?hmac=WSdbBEXvCVSqNN1HnCzm7ohp6DhAJfl9t3TcqBNDn_Q"
  );
  const [output, setOutput] = useState("");

  const ask = async () => {
    if (!input || !inputImage) return;
    const res = await fetch(
      "/api/ai-api/chatgpt-multimodal?input=" + input + "&inputImage=" + inputImage
    );
    const json = await res.json();
    setOutput(json.output);
  };

  return (
    <div className="flex flex-col gap-4 items-end w-96 items-center">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="質問を入力..."
        className="border w-full"
      />
      <input
        value={inputImage}
        onChange={(e) => setInputImage(e.target.value)}
        placeholder="画像URLを入力..."
        className="border  w-full"
      />
      <button onClick={() => ask()} className="underline">
        質問する
      </button>
      <p>{output}</p>
    </div>
  );
}
// #end
`;

export default function Page() {
  const [input, setInput] = useState("画像に移っている物体は何ですか?");
  const [inputImage, setInputImage] = useState(
    "https://fastly.picsum.photos/id/237/300/200.jpg?hmac=WSdbBEXvCVSqNN1HnCzm7ohp6DhAJfl9t3TcqBNDn_Q"
  );
  const [output, setOutput] = useState("");

  const ask = async () => {
    if (!input || !inputImage) return;
    const res = await fetch(
      "/api/ai-api/chatgpt-multimodal?input=" +
        input +
        "&inputImage=" +
        inputImage
    );
    const json = await res.json();
    setOutput(json.output);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="マルチモーダル - ChatGPT API"
        body={`※従量課金制のAPIキーが必要です。
          マルチモーダルモデルを使うと、画像や文章など複数の情報源を処理することができます。
          例えば、画像に映っている物体について質問することができます。
          実行には以下のライブラリが必要です。
          pnpm add openai
          また、環境変数 - .envの章を参考に、OPENAI_API_KEYという名前でAPIキーを環境変数に保存してください。
        `}
        url="https://platform.openai.com/docs/guides/images"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="質問を入力..."
          className="border w-full"
        />
        <input
          value={inputImage}
          onChange={(e) => setInputImage(e.target.value)}
          placeholder="画像URLを入力..."
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
