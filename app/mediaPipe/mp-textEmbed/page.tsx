"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import React, { useEffect, useRef, useState } from "react";

import { TextEmbedder, FilesetResolver } from "@mediapipe/tasks-text";

const code = `
"use client";

import { useEffect, useRef, useState } from "react";

import {
  TextEmbedder,
  FilesetResolver,
} from "@mediapipe/tasks-text";

export default function Page() {
  const textEmbedder = useRef<TextEmbedder | null>(null);
  const [text, setText] = useState("I'm so happy");
  const [text2, setText2] = useState("I'm NOT so happy");
  const [similarity, setSimilarity] = useState(0);

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forTextTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text/wasm"
      );
      textEmbedder.current = await TextEmbedder.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/text_classifier/bert_classifier/float32/1/bert_classifier.tflite",
            delegate: "GPU",
          },
        }
      );
      update();
    };
    createFileResolver();
  }, []);

  const update = async () => {
    if (textEmbedder.current === null) return;
    const embed1 = await textEmbedder.current.embed(text);
    const embed2 = await textEmbedder.current.embed(text2);
    if (!embed1 || !embed2) return;
    //similarity
    const similarity = TextEmbedder.cosineSimilarity(
      embed1.embeddings[0],
      embed2.embeddings[0]
    );
    setSimilarity(similarity);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <p>類似度 : {similarity}</p>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onBlur={update}
          placeholder="文章1を入力..."
          className="border  w-full"
        />
        <input
          value={text2}
          onChange={(e) => {
            setText2(e.target.value);
          }}
          onBlur={update}
          placeholder="文章2を入力..."
          className="border  w-full"
        />
      </div>
    </div>
  );
}
`;

export default function Page() {
  const textEmbedder = useRef<TextEmbedder | null>(null);
  const [text, setText] = useState("I'm so happy");
  const [text2, setText2] = useState("I'm NOT so happy");
  const [similarity, setSimilarity] = useState(0);

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forTextTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text/wasm"
      );
      textEmbedder.current = await TextEmbedder.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/text_classifier/bert_classifier/float32/1/bert_classifier.tflite",
            delegate: "GPU",
          },
        }
      );
      update();
    };
    createFileResolver();
  }, []);

  const update = async () => {
    if (textEmbedder.current === null) return;
    const embed1 = await textEmbedder.current.embed(text);
    const embed2 = await textEmbedder.current.embed(text2);
    if (!embed1 || !embed2) return;
    //similarity
    const similarity = TextEmbedder.cosineSimilarity(
      embed1.embeddings[0],
      embed2.embeddings[0]
    );
    setSimilarity(similarity);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="文章特徴量 - Text Embed"
        body={`画像の特徴ベクトルと同様に、二つの文章の類似度を示すのに使うことができます。
          残念ながら日本語には対応していませんが、否定文には正しく反応することが分かります。

          実行には以下のライブラリが必要です。
          pnpm add @mediapipe/tasks-text
        `}
        url="https://ai.google.dev/edge/mediapipe/solutions/text/text_classifier"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <p>類似度 : {similarity}</p>
        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onBlur={update}
          placeholder="文章1を入力..."
          className="border  w-full"
        />
        <input
          value={text2}
          onChange={(e) => {
            setText2(e.target.value);
          }}
          onBlur={update}
          placeholder="文章2を入力..."
          className="border  w-full"
        />
      </div>
      <Code text={code} />
    </div>
  );
}
