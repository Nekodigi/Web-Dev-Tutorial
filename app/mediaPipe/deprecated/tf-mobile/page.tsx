// "use client";

// import { Code } from "@/components/organisms/code";
// import { Description } from "@/components/organisms/description";
// import Link from "next/link";
// import React, {
//   useCallback,
//   useEffect,
//   useMemo,
//   useRef,
//   useState,
// } from "react";

// import WebCam from "react-webcam";

// import "@tensorflow/tfjs-backend-cpu";
// import "@tensorflow/tfjs-backend-webgl";
// import * as mobilenet from "@tensorflow-models/mobilenet";

// const code = `
// "use client";

// import { useEffect, useRef, useState } from "react";

// import WebCam from "react-webcam";

// import "@tensorflow/tfjs-backend-cpu";
// import "@tensorflow/tfjs-backend-webgl";
// import * as mobilenet from "@tensorflow-models/mobilenet";

// export default function Page() {
//   const [prediction, setPrediction] = useState("");
//   const [embed, setEmbed] = useState<number[] | null>(null);
//   const webcamRef = useRef<WebCam | null>(null);
//   const [similarity, setSimilarity] = useState(0);
//   const [net, setNet] = useState<mobilenet.MobileNet | null>(null);
//   const [refImgSrc, setRefImgSrc] = useState("");

//   useEffect(() => {
//     async function loadModel() {
//       const _net = await mobilenet.load();
//       setNet(_net);
//     }
//     loadModel();
//   });
//   //起動時に、100fps毎に処理を実行するループを呼び出し
//   useEffect(() => {
//     if (!net) return;
//     const loop = setInterval(() => {
//       detect(net, false, embed);
//     }, 10);

//     return () => {
//       clearInterval(loop);
//     };
//   }, [net, embed]);

//   function cosinesim(A: number[], B: number[]) {
//     var dotproduct = 0;
//     var mA = 0;
//     var mB = 0;
//     for (var i = 0; i < A.length; i++) {
//       dotproduct += A[i] * B[i];
//       mA += A[i] * A[i];
//       mB += B[i] * B[i];
//     }
//     mA = Math.sqrt(mA);
//     mB = Math.sqrt(mB);
//     var similarity = dotproduct / (mA * mB);
//     return similarity;
//   }

//   const detect = async (
//     _net: mobilenet.MobileNet,
//     captureEmbed: boolean,
//     embedSnapshot: number[] | null = null
//   ) => {
//     if (
//       typeof webcamRef.current === "undefined" ||
//       webcamRef.current === null ||
//       webcamRef.current.video === null ||
//       webcamRef.current.video.readyState !== 4
//     )
//       return;

//     //画面幅のコピー
//     const video = webcamRef.current.video;
//     //AI実行
//     const pred = await _net.classify(video);
//     const _embed = ((await _net.infer(video, true).array()) as number[][])[0];
//     if (captureEmbed) {
//       setEmbed(_embed);
//       console.log("CAPTURE");
//     }
//     //結果取得
//     setPrediction(pred[0].className);
//     if (embedSnapshot) {
//       const similarity = cosinesim(embedSnapshot, _embed);
//       setSimilarity(similarity);
//     }
//   };
//   const onSetTarget = () => {
//     net && detect(net, true, embed);
//     const imageSrc = webcamRef.current?.getScreenshot();
//     imageSrc && setRefImgSrc(imageSrc);
//   };

//   return (
//     <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
//       <div className="flex flex-col gap-4 items-end w-96 items-center">
//         <p>予測クラス：{prediction}</p>
//         {similarity ? (
//           <p>類似度 : {(similarity * 100).toPrecision(4)}%</p>
//         ) : (
//           <p>類似度基準を設定してください</p>
//         )}
//         <WebCam ref={webcamRef} screenshotFormat="image/jpeg" />
//         <button onClick={() => onSetTarget()} className="underline">
//           類似度基準を設定
//         </button>
//         {refImgSrc && <img src={refImgSrc} alt="基準画像" />}
//       </div>
//     </div>
//   );
// }
// `;

// export default function Page() {
//   const [prediction, setPrediction] = useState("");
//   const [embed, setEmbed] = useState<number[] | null>(null);
//   const webcamRef = useRef<WebCam | null>(null);
//   const [similarity, setSimilarity] = useState(0);
//   const [net, setNet] = useState<mobilenet.MobileNet | null>(null);
//   const [refImgSrc, setRefImgSrc] = useState("");

//   useEffect(() => {
//     async function loadModel() {
//       const _net = await mobilenet.load();
//       setNet(_net);
//     }
//     loadModel();
//   });
//   //起動時に、100fps毎に処理を実行するループを呼び出し
//   useEffect(() => {
//     if (!net) return;
//     const loop = setInterval(() => {
//       detect(net, false, embed);
//     }, 10);

//     return () => {
//       clearInterval(loop);
//     };
//   }, [net, embed]);

//   function cosinesim(A: number[], B: number[]) {
//     var dotproduct = 0;
//     var mA = 0;
//     var mB = 0;
//     for (var i = 0; i < A.length; i++) {
//       dotproduct += A[i] * B[i];
//       mA += A[i] * A[i];
//       mB += B[i] * B[i];
//     }
//     mA = Math.sqrt(mA);
//     mB = Math.sqrt(mB);
//     var similarity = dotproduct / (mA * mB);
//     return similarity;
//   }

//   const detect = async (
//     _net: mobilenet.MobileNet,
//     captureEmbed: boolean,
//     embedSnapshot: number[] | null = null
//   ) => {
//     if (
//       typeof webcamRef.current === "undefined" ||
//       webcamRef.current === null ||
//       webcamRef.current.video === null ||
//       webcamRef.current.video.readyState !== 4
//     )
//       return;

//     //画面幅のコピー
//     const video = webcamRef.current.video;
//     //AI実行
//     const pred = await _net.classify(video);
//     const _embed = ((await _net.infer(video, true).array()) as number[][])[0];
//     if (captureEmbed) {
//       setEmbed(_embed);
//       console.log("CAPTURE");
//     }
//     //結果取得
//     setPrediction(pred[0].className);
//     if (embedSnapshot) {
//       const similarity = cosinesim(embedSnapshot, _embed);
//       setSimilarity(similarity);
//     }
//   };
//   const onSetTarget = () => {
//     net && detect(net, true, embed);
//     const imageSrc = webcamRef.current?.getScreenshot();
//     imageSrc && setRefImgSrc(imageSrc);
//   };

//   return (
//     <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
//       <Description
//         title="画像識別/特徴量 - Mobile Net"
//         body={`ブラウザ上で動作するAIモデルは、精度が低く読み込みに時間がかかる欠点はあるものの、完全無料で無制限に使えるのが特徴です。
//           AIの読み込み終わるまで数秒から数十秒ほどお待ちください。
//           このMobile NetはImage Netのクラスに基づいた画像分類が可能です。
//           加えて、被写体の特徴を示す特徴量ベクトルの出力も可能です。
//           特徴量ベクトルは軽量でありつつも本質的な特徴が捉えられており、これを用いて簡単な演算で類似度やクラス分けを行うことができます。
//           具体的には、画像検索や顔認証などで広く用いられています。

//           実行には以下のライブラリが必要です。
//           pnpm add react-webcam
//           pnpm add tfjs-backend-cpu
//           pnpm add tfjs-backend-webgl

//           pnpm add @tensorflow-models/mobilenet
//         `}
//         url="https://www.npmjs.com/package/@tensorflow-models/mobilenet"
//       />
//       <div className="flex flex-col gap-4 items-end w-96 items-center">
//         <p>予測クラス：{prediction}</p>
//         {similarity ? (
//           <p>類似度 : {(similarity * 100).toPrecision(4)}%</p>
//         ) : (
//           <p>類似度基準を設定してください</p>
//         )}
//         <WebCam ref={webcamRef} screenshotFormat="image/jpeg" />
//         <button onClick={() => onSetTarget()} className="underline">
//           類似度基準を設定
//         </button>
//         {refImgSrc && <img src={refImgSrc} alt="基準画像" />}
//       </div>
//       <Code text={code} />
//     </div>
//   );
// }
