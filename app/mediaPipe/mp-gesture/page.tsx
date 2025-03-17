"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import React, { useEffect, useMemo, useRef, useState } from "react";

import WebCam from "react-webcam";

import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

const code = `
"use client";

import { useEffect, useRef, useState } from "react";

import WebCam from "react-webcam";

import { GestureRecognizer, FilesetResolver } from "@mediapipe/tasks-vision";

export default function Page() {
  const webcamRef = useRef<WebCam | null>(null);
  const gestureRecognizer = useRef<GestureRecognizer | null>(null);
  const [gesture, setGesture] = useState("");
  const gestureIcon = {
    None: "❌",
    Closed_Fist: "✊",
    Open_Palm: "👋",
    Pointing_Up: "☝️",
    Victory: "✌️",
    Thumb_Up: "👍",
    Thumb_Down: "👎",
    ILoveYou: "🤟",
  };

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );
      gestureRecognizer.current = await GestureRecognizer.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "GPU",
          },
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
    if (gestureRecognizer.current === null) return;
    const gesture = await gestureRecognizer.current.recognize(video);
    if (gesture.gestures.length === 0) return;
    const category = gesture.gestures[0][0].categoryName;
    if (category === "None") return;
    setGesture(gestureIcon[category as keyof typeof gestureIcon]);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <p>手でジェスチャーしてください</p>
        <p className="text-8xl">{gesture}</p>
        <WebCam ref={webcamRef} />
      </div>
    </div>
  );
}
`;

export default function Page() {
  const webcamRef = useRef<WebCam | null>(null);
  const gestureRecognizer = useRef<GestureRecognizer | null>(null);
  const [gesture, setGesture] = useState("");
  const gestureIcon = {
    None: "❌",
    Closed_Fist: "✊",
    Open_Palm: "👋",
    Pointing_Up: "☝️",
    Victory: "✌️",
    Thumb_Up: "👍",
    Thumb_Down: "👎",
    ILoveYou: "🤟",
  };

  //copy image to canvas every 10ms
  useEffect(() => {
    const createFileResolver = async () => {
      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      );
      gestureRecognizer.current = await GestureRecognizer.createFromOptions(
        filesetResolver,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "GPU",
          },
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
    if (gestureRecognizer.current === null) return;
    const gesture = await gestureRecognizer.current.recognize(video);
    if (gesture.gestures.length === 0) return;
    const category = gesture.gestures[0][0].categoryName;
    if (category === "None") return;
    setGesture(gestureIcon[category as keyof typeof gestureIcon]);
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="ジェスチャー - Gesture"
        body={`手の形状だけでなく、そのジェスチャーの意味まで判別を行うのがGesture Recognitionです。

          実行には以下のライブラリが必要です。
          pnpm add react-webcam
          pnpm add @mediapipe/tasks-vision
        `}
        url="https://ai.google.dev/edge/mediapipe/solutions/vision/gesture_recognizer/web_js"
      />
      <div className="flex flex-col gap-4 items-end w-96 items-center">
        <p>手でジェスチャーしてください</p>
        <p className="text-8xl">{gesture}</p>
        <WebCam ref={webcamRef} />
      </div>
      <Code text={code} />
    </div>
  );
}
