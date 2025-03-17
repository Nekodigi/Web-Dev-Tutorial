"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import React, { useEffect, useMemo, useRef, useState } from "react";

import WebCam from "react-webcam";

import {
  ImageEmbedder,
  FilesetResolver,
  ImageEmbedderResult,
} from "@mediapipe/tasks-vision";

const code = `
"use client";

import { useEffect, useRef, useState } from "react";

import WebCam from "react-webcam";

import {
  ImageEmbedder,
  FilesetResolver,
  ImageEmbedderResult,
} from "@mediapipe/tasks-vision";

export default function Page() {
  const webcamRef = useRef<WebCam | null>(null);
  const imageEmbedder = useRef<ImageEmbedder | null>(null);
  const [similarity, setSimilarity] = useState(0);
  const [refImgSrc, setRefImgSrc] = useState("");
  const refEmbed = useRef<ImageEmbedderResult | null>(null);

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );
      imageEmbedder.current = await ImageEmbedder.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite",
            delegate: "GPU",
          },
        }
      );
      setInterval(() => {
        calculate();
      }, 10);
    };
    createFileResolver();
  }, []);

  const calculate = async () => {
    const embed = await getEmbed();
    console.log("calculate", embed, refEmbed.current);
    if (!embed || !refEmbed.current) return;
    const similarity = ImageEmbedder.cosineSimilarity(
      embed.embeddings[0],
      refEmbed.current.embeddings[0]
    );
    setSimilarity(similarity);
  };

  const getEmbed = async () => {
    if (
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4
    )
      return;
    const video = webcamRef.current.video;
    if (imageEmbedder.current === null) return;
    const embed = await imageEmbedder.current.embed(video);
    return embed;
  };
  const onSetTarget = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    setRefImgSrc(imageSrc);
    const embed = await getEmbed();
    if (!embed) return;
    refEmbed.current = embed;
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        {similarity ? (
          <p>類似度 : {(similarity * 100).toPrecision(4)}%</p>
        ) : (
          <p>類似度基準を設定してください</p>
        )}
        <WebCam ref={webcamRef} />
        <button onClick={() => onSetTarget()} className="underline">
          類似度基準を設定
        </button>
        {refImgSrc && <img src={refImgSrc} alt="基準画像" />}
      </div>
    </div>
  );
}
`;

export default function Page() {
  const webcamRef = useRef<WebCam | null>(null);
  const imageEmbedder = useRef<ImageEmbedder | null>(null);
  const [similarity, setSimilarity] = useState(0);
  const [refImgSrc, setRefImgSrc] = useState("");
  const refEmbed = useRef<ImageEmbedderResult | null>(null);

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );
      imageEmbedder.current = await ImageEmbedder.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite",
            delegate: "GPU",
          },
        }
      );
      setInterval(() => {
        calculate();
      }, 10);
    };
    createFileResolver();
  }, []);

  const calculate = async () => {
    const embed = await getEmbed();
    console.log("calculate", embed, refEmbed.current);
    if (!embed || !refEmbed.current) return;
    const similarity = ImageEmbedder.cosineSimilarity(
      embed.embeddings[0],
      refEmbed.current.embeddings[0]
    );
    setSimilarity(similarity);
  };

  const getEmbed = async () => {
    if (
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4
    )
      return;
    const video = webcamRef.current.video;
    if (imageEmbedder.current === null) return;
    const embed = await imageEmbedder.current.embed(video);
    return embed;
  };
  const onSetTarget = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) return;
    setRefImgSrc(imageSrc);
    const embed = await getEmbed();
    if (!embed) return;
    refEmbed.current = embed;
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="特徴量ベクトル - Embedding"
        body={`特徴量ベクトル軽量でありつつも画像の本質的な特徴を捉えたベクトルです。
          これを用いると簡単な演算で類似度計算やクラス分けを行うことができます。
          具体的には、画像検索や顔認証などで広く用いられています。
          AIの読み込み終わるまで数秒から数十秒ほどお待ちください。

          実行には以下のライブラリが必要です。
          pnpm add react-webcam
          pnpm add @mediapipe/tasks-vision
        `}
        url="https://ai.google.dev/edge/mediapipe/solutions/vision/image_embedder"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        {similarity ? (
          <p>類似度 : {(similarity * 100).toPrecision(4)}%</p>
        ) : (
          <p>類似度基準を設定してください</p>
        )}
        <WebCam ref={webcamRef} />
        <button onClick={() => onSetTarget()} className="underline">
          類似度基準を設定
        </button>
        {refImgSrc && <img src={refImgSrc} alt="基準画像" />}
      </div>
      <Code text={code} />
    </div>
  );
}
