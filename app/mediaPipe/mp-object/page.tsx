"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import React, { useEffect, useMemo, useRef, useState } from "react";

import WebCam from "react-webcam";

import { ObjectDetector, FilesetResolver } from "@mediapipe/tasks-vision";

const code = `
"use client";

import { useEffect, useRef } from "react";

import { ObjectDetector, FilesetResolver } from "@mediapipe/tasks-vision";

export default function Page() {
  const webcamRef = useRef<WebCam | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const objectDetector = useRef<ObjectDetector | null>(null);

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );
      objectDetector.current = await ObjectDetector.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite",
            delegate: "GPU",
          },
          scoreThreshold: 0.5,
        }
      );
      setInterval(() => {
        detect();
      }, 10);
    };
    createFileResolver();
  }, []);

  const detect = async () => {
    if (
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4
    )
      return;
    const video = webcamRef.current.video;
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (objectDetector.current === null || !ctx) return;
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.drawImage(video, 0, 0, width, height);

    const result = await objectDetector.current.detect(video);
    //draw result
    result.detections.forEach((prediction) => {
      const category = prediction.categories[0];
      //show category as text
      ctx.strokeStyle = "red";
      const bbox = prediction.boundingBox;
      if (!bbox) return;
      ctx.strokeRect(bbox.originX, bbox.originY, bbox.width, bbox.height);
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(
        category.categoryName + " " + category.score.toFixed(2),
        bbox.originX,
        bbox.originY
      );
    });
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
  const objectDetector = useRef<ObjectDetector | null>(null);

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );
      objectDetector.current = await ObjectDetector.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite",
            delegate: "GPU",
          },
          scoreThreshold: 0.5,
        }
      );
      setInterval(() => {
        detect();
      }, 10);
    };
    createFileResolver();
  }, []);

  const detect = async () => {
    if (
      !webcamRef.current ||
      !webcamRef.current.video ||
      webcamRef.current.video.readyState !== 4
    )
      return;
    const video = webcamRef.current.video;
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (objectDetector.current === null || !ctx) return;
    const width = video.videoWidth;
    const height = video.videoHeight;
    canvasRef.current.width = width;
    canvasRef.current.height = height;
    ctx.drawImage(video, 0, 0, width, height);

    const result = await objectDetector.current.detect(video);
    //draw result
    result.detections.forEach((prediction) => {
      const category = prediction.categories[0];
      //show category as text
      ctx.strokeStyle = "red";
      const bbox = prediction.boundingBox;
      if (!bbox) return;
      ctx.strokeRect(bbox.originX, bbox.originY, bbox.width, bbox.height);
      ctx.fillStyle = "white";
      ctx.font = "20px Arial";
      ctx.fillText(
        category.categoryName + " " + category.score.toFixed(2),
        bbox.originX,
        bbox.originY
      );
    });
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="物体検出 - Object Detection"
        body={`物体検出し、クラスと物体が含まれる四角い領域を表示するサンプルです。
          AIの読み込み終わるまで数秒から数十秒ほどお待ちください。

          実行には以下のライブラリが必要です。
          pnpm add 
          pnpm add @mediapipe/tasks-vision
        `}
        url="https://ai.google.dev/edge/mediapipe/solutions/vision/object_detector/web_js"
      />
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
      <Code text={code} />
    </div>
  );
}
