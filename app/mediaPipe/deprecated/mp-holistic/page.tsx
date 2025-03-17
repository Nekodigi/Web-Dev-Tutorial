"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

import WebCam from "react-webcam";

import {
  HolisticLandmarker,
  FilesetResolver,
  DrawingUtils,
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

  useEffect(() => {
    const holistic = new mpHolistic.Holistic({
      locateFile: (file: string) => {
        return "https://cdn.jsdelivr.net/npm/@mediapipe/holistic/"+ file;
      },
    });

    holistic.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: true,
      smoothSegmentation: true,
      refineFaceLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });
    holistic.onResults(onResults);

    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null
    ) {
      if (!webcamRef.current?.video) return;
      const camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          if (!webcamRef.current?.video) return;
          await holistic.send({ image: webcamRef.current.video });
        },
        width: 640,
        height: 480,
      });
      camera.start();
    }
  }, []);

  const onResults = (results: mpHolistic.Results) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    const video = webcamRef.current?.video;
    if (!video || !canvasRef.current) return;
    canvasRef.current.width = video.videoWidth;
    canvasRef.current.height = video.videoHeight;
    ctx.drawImage(
      results.segmentationMask,
      0,
      0,
      video.videoWidth,
      video.videoHeight
    );
    draw.drawConnectors(
      ctx,
      results.faceLandmarks,
      mpHolistic.FACEMESH_TESSELATION
    );
    draw.drawConnectors(
      ctx,
      results.leftHandLandmarks,
      mpHolistic.HAND_CONNECTIONS
    );
    draw.drawConnectors(
      ctx,
      results.rightHandLandmarks,
      mpHolistic.HAND_CONNECTIONS
    );
    draw.drawConnectors(
      ctx,
      results.poseLandmarks,
      mpHolistic.POSE_CONNECTIONS
    );
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
  const holisticLandmarker = useRef<HolisticLandmarker | null>(null);

  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );
      holisticLandmarker.current = await HolisticLandmarker.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/holistic_landmarker/holistic_landmarker/float16/1/holistic_landmarker.task",
            delegate: "GPU",
          },
          outputPoseSegmentationMasks: true,
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
      !canvasRef.current ||
      webcamRef.current.video.readyState !== 4
    )
      return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    const video = webcamRef.current.video;
    const width = video.videoWidth;
    const height = video.videoHeight;
    if (holisticLandmarker.current === null) return;
    const holistic = await holisticLandmarker.current.detect(video);

    ctx.drawImage(holistic.poseSegmentationMasks[0], 0, 0, width, height);
    const drawingUtils = new DrawingUtils(ctx);
    drawingUtils.drawConnectors(
      holistic.poseLandmarks[0],
      HolisticLandmarker.POSE_CONNECTIONS
    );
    drawingUtils.drawLandmarks(holistic.poseLandmarks[0]);
    drawingUtils.drawConnectors(
      holistic.leftHandLandmarks[0],
      HolisticLandmarker.HAND_CONNECTIONS
    );
    drawingUtils.drawLandmarks(holistic.leftHandLandmarks[0]);
    drawingUtils.drawConnectors(
      holistic.rightHandLandmarks[0],
      HolisticLandmarker.HAND_CONNECTIONS
    );
    drawingUtils.drawLandmarks(holistic.rightHandLandmarks[0]);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="全身検出 - Holistic"
        body={`※実行にはWebカメラが必要です。
          MediaPipeのHolisticというライブラリを使うと、全身・両手・顔のポーズ検出と人物のセグメンテーションを一度に行うことができます。
          MediaPipeには他にもブラウザで動作する便利なAIが多数公開されているので確認することをお勧めします！
          AIの読み込み終わるまで数秒から数十秒ほどお待ちください。
          
          実行には以下のライブラリが必要です。
          pnpm add react-webcam
          pnpm add @mediapipe/camera_utils
          pnpm add @mediapipe/holistic
          pnpm add @mediapipe/drawing_utils
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
        <canvas ref={canvasRef} />
      </div>
      <Code text={code} />
    </div>
  );
}
