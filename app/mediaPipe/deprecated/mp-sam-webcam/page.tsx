"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import WebCam from "react-webcam";

import {
  InteractiveSegmenter,
  FilesetResolver,
  MPMask,
} from "@mediapipe/tasks-vision";

import * as cam from "@mediapipe/camera_utils";
import * as mpHolistic from "@mediapipe/holistic";
import * as draw from "@mediapipe/drawing_utils";

const code = `
"use client";

import { useEffect, useRef } from "react";

import WebCam from "react-webcam";

import "@tensorflow/tfjs-backend-cpu";
import "@tensorflow/tfjs-backend-webgl";
import * as cocossd from "@tensorflow-models/coco-ssd";

export default function Page() {
  const webcamRef = useRef<WebCam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  //起動時に、100fps毎に処理を実行するループを呼び出し
  useEffect(() => {
    runModel();
  }, []);
  const runModel = async () => {
    //ネットワークのロード
    const net = await cocossd.load();
    //100fpsのループ
    setInterval(() => {
      detect(net);
    }, 10);
  };

  const detect = async (net: cocossd.ObjectDetection) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video !== null &&
      canvas !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      //画面幅のコピー
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      canvas.width = videoWidth;
      canvas.height = videoHeight;
      //AI実行
      const obj = await net.detect(video);
      //描画
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(video, 0, 0, videoWidth, videoHeight);
      if (ctx !== null) {
        // Draw keypoints
        obj.forEach((prediction) => {
          const x = prediction.bbox[0];
          const y = prediction.bbox[1];
          const width = prediction.bbox[2];
          const height = prediction.bbox[3];

          ctx.strokeStyle = "red";
          ctx.strokeRect(x, y, width, height);
          ctx.fillStyle = "white";
          ctx.font = "32px Arial";
          ctx.fillText(prediction.class, x, y);
        });
      }
    }
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <WebCam
          ref={webcamRef}
          style={{
            width: "0%",
            height: "0%",
          }}
        />
        <canvas ref={canvasRef} />
      </div>
    </div>
  );
}
`;

export default function Page() {
  const webcamRef = useRef<WebCam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const interactiveSegmenter = useRef<InteractiveSegmenter | null>(null);

  //copy image to canvas every 10ms
  const streamCam = useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );
      interactiveSegmenter.current =
        await InteractiveSegmenter.createFromOptions(filesetResolver, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/interactive_segmenter/magic_touch/float32/1/magic_touch.tflite`,
            delegate: "GPU",
          },
          outputCategoryMask: true,
          outputConfidenceMasks: false,
        });
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext("2d");
      //文章を表示。　カメラ画像を取得
      if (!ctx) return;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "48px Arial";
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 640, 480);
      ctx.fillStyle = "black";
      ctx.fillText("Click to capture", 320, 240);
    };
    createFileResolver();
  }, []);

  const onClick = async (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    if (interactiveSegmenter.current === null) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const video = webcamRef.current?.video;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const bb = canvas.getBoundingClientRect();
    const x = event.clientX - bb.left;
    const y = event.clientY - bb.top;
    console.log(bb);
    const point = {
      x: x / bb.width,
      y: y / bb.height,
    };
    const result = await interactiveSegmenter.current.segment(video, {
      keypoint: point,
    });
    console.log(point);
    if (!result.categoryMask) return;
    ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    drawSegmentation(result.categoryMask, ctx);
    //draw point on ctx
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();
  };

  const drawSegmentation = (mask: MPMask, ctx: CanvasRenderingContext2D) => {
    const width = mask.width;
    const height = mask.height;
    const maskData = mask.getAsFloat32Array();

    ctx.fillStyle = "#00000000";
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "rgba(18, 181, 203, 0.7)";

    maskData.forEach((category, index) => {
      if (Math.round(category * 255.0) === 0) {
        const x = (index + 1) % width;
        const y = (index + 1 - x) / width;
        ctx.fillRect(x, y, 1, 1);
      }
    });
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="全身検出 - Holistic"
        body={`※Webカメラ利用が前提です。
          MediaPipeのHolisticというライブラリを使うと、全身・両手・顔のポーズ検出と人物のセグメンテーションを一度に行うことができます。
          MediaPipeには他にもブラウザで動作する便利なAIが多数公開されているので確認することをお勧めします！
          AIの読み込み終わるまで数秒から数十秒ほどお待ちください。
          実行には以下のライブラリが必要です。
          pnpm add react-webcam
          pnpm add tfjs-backend-cpu
          pnpm add tfjs-backend-webgl

          pnpm add @mediapipe/hands
          pnpm add @tensorflow-models/coco-ssd
        `}
        url="https://chuoling.github.io/mediapipe/solutions/holistic#javascript-solution-api"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <WebCam
          ref={webcamRef}
          style={{
            width: "0%",
            height: "0%",
          }}
        />
        <canvas ref={canvasRef} onClick={(e) => onClick(e)} />
      </div>
      <Code text={code} />
    </div>
  );
}
