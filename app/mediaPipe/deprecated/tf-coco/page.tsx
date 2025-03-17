// "use client";

// import { Code } from "@/components/organisms/code";
// import { Description } from "@/components/organisms/description";
// import Link from "next/link";
// import React, { useEffect, useRef, useState } from "react";

// import WebCam from "react-webcam";

// import "@tensorflow/tfjs-backend-webgl";
// import * as cocossd from "@tensorflow-models/coco-ssd";

// const code = `
// "use client";

// import { useEffect, useRef } from "react";

// import WebCam from "react-webcam";

// import "@tensorflow/tfjs-backend-cpu";
// import "@tensorflow/tfjs-backend-webgl";
// import * as cocossd from "@tensorflow-models/coco-ssd";

// export default function Page() {
//   const webcamRef = useRef<WebCam | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   //起動時に、100fps毎に処理を実行するループを呼び出し
//   useEffect(() => {
//     runModel();
//   }, []);
//   const runModel = async () => {
//     //ネットワークのロード
//     const net = await cocossd.load();
//     //100fpsのループ
//     setInterval(() => {
//       detect(net);
//     }, 10);
//   };

//   const detect = async (net: cocossd.ObjectDetection) => {
//     // Check data is available
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video !== null &&
//       canvasRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       //画面幅のコピー
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;
//       //AI実行
//       const obj = await net.detect(video);
//       //描画
//       const ctx = canvasRef.current.getContext("2d");
//       ctx?.drawImage(video, 0, 0, videoWidth, videoHeight);
//       if (ctx !== null) {
//         // Draw keypoints
//         obj.forEach((prediction) => {
//           const x = prediction.bbox[0];
//           const y = prediction.bbox[1];
//           const width = prediction.bbox[2];
//           const height = prediction.bbox[3];

//           ctx.strokeStyle = "red";
//           ctx.strokeRect(x, y, width, height);
//           ctx.fillStyle = "white";
//           ctx.font = "32px Arial";
//           ctx.fillText(prediction.class, x, y);
//         });
//       }
//     }
//   };

//   return (
//     <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
//       <div className="flex flex-col gap-4 items-end w-96 items-center">
//         <WebCam
//           ref={webcamRef}
//           style={{
//             width: "0%",
//             height: "0%",
//           }}
//         />
//         <canvas ref={canvasRef} />
//       </div>
//     </div>
//   );
// }
// `;

// export default function Page() {
//   const webcamRef = useRef<WebCam | null>(null);
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   //起動時に、100fps毎に処理を実行するループを呼び出し
//   useEffect(() => {
//     runModel();
//   }, []);
//   const runModel = async () => {
//     //ネットワークのロード
//     const net = await cocossd.load();
//     //100fpsのループ
//     setInterval(() => {
//       detect(net);
//     }, 10);
//   };

//   const detect = async (net: cocossd.ObjectDetection) => {
//     // Check data is available
//     if (
//       typeof webcamRef.current !== "undefined" &&
//       webcamRef.current !== null &&
//       webcamRef.current.video !== null &&
//       canvasRef.current !== null &&
//       webcamRef.current.video.readyState === 4
//     ) {
//       //画面幅のコピー
//       const video = webcamRef.current.video;
//       const videoWidth = webcamRef.current.video.videoWidth;
//       const videoHeight = webcamRef.current.video.videoHeight;
//       canvasRef.current.width = videoWidth;
//       canvasRef.current.height = videoHeight;
//       //AI実行
//       const obj = await net.detect(video);
//       //描画
//       const ctx = canvasRef.current.getContext("2d");
//       ctx?.drawImage(video, 0, 0, videoWidth, videoHeight);
//       if (ctx !== null) {
//         // Draw keypoints
//         obj.forEach((prediction) => {
//           const x = prediction.bbox[0];
//           const y = prediction.bbox[1];
//           const width = prediction.bbox[2];
//           const height = prediction.bbox[3];

//           ctx.strokeStyle = "red";
//           ctx.strokeRect(x, y, width, height);
//           ctx.fillStyle = "white";
//           ctx.font = "32px Arial";
//           ctx.fillText(prediction.class, x, y);
//         });
//       }
//     }
//   };

//   return (
//     <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
//       <Description
//         title="物体検出 - COCO SSD"
//         body={`物体検出し、クラスと物体が含まれる四角い領域を表示するサンプルです。
//           AIの読み込み終わるまで数秒から数十秒ほどお待ちください。
//           実行には以下のライブラリが必要です。
//           pnpm add react-webcam
//           pnpm add tfjs-backend-cpu
//           pnpm add tfjs-backend-webgl

//           pnpm add @tensorflow-models/coco-ssd
//         `}
//         url="https://platform.openai.com/docs/guides/text"
//       />
//       <div className="flex flex-col gap-4 items-end w-96 items-center">
//         <WebCam
//           ref={webcamRef}
//           style={{
//             width: "0%",
//             height: "0%",
//           }}
//         />
//         <canvas ref={canvasRef} />
//       </div>
//       <Code text={code} />
//     </div>
//   );
// }
