"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  InteractiveSegmenter,
  FilesetResolver,
  MPMask,
} from "@mediapipe/tasks-vision";

const code = `
"use client";

import { useEffect, useRef } from "react";

import {
  InteractiveSegmenter,
  FilesetResolver,
  MPMask,
} from "@mediapipe/tasks-vision";

export default function Page() {
  const URL = "https://picsum.photos/640/480";
  const [imageUrl, setImageUrl] = useState(URL);
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
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/interactive_segmenter/magic_touch/float32/1/magic_touch.tflite",
            delegate: "GPU",
          },
          outputCategoryMask: true,
          outputConfidenceMasks: false,
        });
      samAt(0, 0, imageUrl);
    };
    createFileResolver();
  }, []);

  const samAt = async (x: number, y: number, url: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext("2d");
    if (interactiveSegmenter.current === null || !ctx) return;
    //load image from URL
    //allow cross origin
    const image = new Image();
    image.src = url;
    image.crossOrigin = "anonymous";
    await new Promise((resolve) => {
      image.onload = resolve;
    });
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const bb = canvas.getBoundingClientRect();

    const point = {
      x: x / bb.width,
      y: y / bb.height,
    };
    const result = await interactiveSegmenter.current.segment(image, {
      keypoint: point,
    });
    if (!result.categoryMask) return;
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

  const onClick = async (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bb = canvas.getBoundingClientRect();
    samAt(event.clientX - bb.left, event.clientY - bb.top, imageUrl);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="画像URL"
          className="border w-full"
        />
        <button onClick={() => samAt(0, 0, imageUrl)} className="underline">
          画像を読み込み
        </button>
        <canvas ref={canvasRef} onClick={(e) => onClick(e)} />
      </div>
    </div>
  );
}
`;

export default function Page() {
  const URL = "https://picsum.photos/640/480";
  const [imageUrl, setImageUrl] = useState(URL);
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
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/interactive_segmenter/magic_touch/float32/1/magic_touch.tflite",
            delegate: "GPU",
          },
          outputCategoryMask: true,
          outputConfidenceMasks: false,
        });
      samAt(0, 0, imageUrl);
    };
    createFileResolver();
  }, []);

  const samAt = async (x: number, y: number, url: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas?.getContext("2d");
    if (interactiveSegmenter.current === null || !ctx) return;
    //load image from URL
    //allow cross origin
    const image = new Image();
    image.src = url;
    image.crossOrigin = "anonymous";
    await new Promise((resolve) => {
      image.onload = resolve;
    });
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0, image.width, image.height);

    const bb = canvas.getBoundingClientRect();

    const point = {
      x: x / bb.width,
      y: y / bb.height,
    };
    const result = await interactiveSegmenter.current.segment(image, {
      keypoint: point,
    });
    if (!result.categoryMask) return;
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

  const onClick = async (
    event: React.MouseEvent<HTMLCanvasElement, MouseEvent>
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const bb = canvas.getBoundingClientRect();
    samAt(event.clientX - bb.left, event.clientY - bb.top, imageUrl);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="背景除去 - SAM"
        body={`FacebookでSAM(Segmentation Anything Model)が発表されていこう主流となった、任意物体を切り出せる機能です。
          MediapipeではInteractive Segmentationと呼ばれています。
          画像の任意の点をクリックすると、その領域が切り出されます。

          実行には以下のライブラリが必要です。
          pnpm add @mediapipe/tasks-vision
        `}
        url="https://ai.google.dev/edge/mediapipe/solutions/vision/interactive_segmenter"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="画像URL"
          className="border w-full"
        />
        <button onClick={() => samAt(0, 0, imageUrl)} className="underline">
          画像を読み込み
        </button>
        <canvas ref={canvasRef} onClick={(e) => onClick(e)} />
      </div>
      <Code text={code} />
    </div>
  );
}
