"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import React, { useEffect, useRef, useState } from "react";

import {
  TextClassifier,
  FilesetResolver,
  Category,
} from "@mediapipe/tasks-text";

const code = `
"use client";

import { useEffect, useRef, useState } from "react";

import {
  TextClassifier,
  FilesetResolver,
  Category,
} from "@mediapipe/tasks-text";

export default function Page() {
  const textClassifier = useRef<TextClassifier | null>(null);
  const [text, setText] = useState("今日はすごく元気です！");
  const [categories, setCategories] = useState<Category[]>([]);

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forTextTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text/wasm"
      );
      textClassifier.current = await TextClassifier.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/text_classifier/bert_classifier/float32/1/bert_classifier.tflite",
            delegate: "GPU",
          },
        }
      );
    };
    createFileResolver();
  }, []);

  const classify = async () => {
    if (textClassifier.current === null) return;
    const classification = await textClassifier.current.classify(text);
    setCategories(classification.classifications[0].categories);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="文字を入力..."
          className="border  w-full"
        />
        <button onClick={() => classify()} className="underline">
          分析する
        </button>
        {categories.map((category) => (
          <p>
            {category.categoryName} : {category.score}
          </p>
        ))}
      </div>
    </div>
  );
}
`;

export default function Page() {
  const textClassifier = useRef<TextClassifier | null>(null);
  const [text, setText] = useState("今日はすごく元気です！");
  const [categories, setCategories] = useState<Category[]>([]);

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forTextTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-text/wasm"
      );
      textClassifier.current = await TextClassifier.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/text_classifier/bert_classifier/float32/1/bert_classifier.tflite",
            delegate: "GPU",
          },
        }
      );
    };
    createFileResolver();
  }, []);

  const classify = async () => {
    if (textClassifier.current === null) return;
    const classification = await textClassifier.current.classify(text);
    setCategories(classification.classifications[0].categories);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="文章分類 - Text Class"
        body={`このデモでは文章をpositiveとnegativeの2クラスに分類します。
          まだ日本語では精度が低いため、APIの活用が無難ですが、コスト0で使える点が魅力的です。

          実行には以下のライブラリが必要です。
          pnpm add @mediapipe/tasks-text
        `}
        url="https://ai.google.dev/edge/mediapipe/solutions/text/text_classifier"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="文字を入力..."
          className="border  w-full"
        />
        <button onClick={() => classify()} className="underline">
          分析する
        </button>
        {categories.map((category) => (
          <p key={category.categoryName}>
            {category.categoryName} : {category.score}
          </p>
        ))}
      </div>
      <Code text={code} />
    </div>
  );
}
