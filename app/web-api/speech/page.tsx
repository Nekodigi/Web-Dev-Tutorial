"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";

const code = `"use client";

import { useState } from "react";

import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Page() {
  const [text, setText] = useState("喋ったぁ～～！");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const speech = window.speechSynthesis;
    speech.cancel(); //前の発話をキャンセルし、確実に発話する
    utterance.lang = "ja-JP"; //ブラウザがサポートしない場合は、コメントアウト&speakの内容を英語に変更。Chromeでテスト済み
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!transcript) return;
    setText(transcript);
  }, [transcript]);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メモを入力..."
          className="border"
        />
        <button
          onClick={() =>
            SpeechRecognition.startListening({ language: "ja-JP" })
          }
        >
          聞く
        </button>
        <button onClick={() => speak(text)}>話す</button>
      </div>
    </div>
  );
}

`;

import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function Page() {
  const [text, setText] = useState("喋ったぁ～～！");
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    const speech = window.speechSynthesis;
    speech.cancel(); //前の発話をキャンセルし、確実に発話する
    utterance.lang = "ja-JP"; //ブラウザがサポートしない場合は、コメントアウト&speakの内容を英語に変更。Chromeでテスト済み
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    if (!transcript) return;
    setText(transcript);
  }, [transcript]);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="音声認識/合成 - Web Speech API"
        body={`
            ブラウザに標準搭載されているため完全無料で使える音声APIです。
            一部ブラウザには搭載されていませんが、Chromeでの動作は確認済みです。
            より簡単に扱うために以下のライブラリをインストールしてください。
            pnpm add react-speech-recognition
            pnpm add regenerator-runtime
            pnpm add -D @types/react-speech-recognition
        `}
        url="https://ui.shadcn.com/docs/installation/next"
        urlDesc="公式インストールガイド"
      />
      <div className="flex flex-col gap-4 items-end">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="話す内容を入力..."
          className="border"
        />
        <button
          onClick={() =>
            SpeechRecognition.startListening({ language: "ja-JP" })
          }
        >
          聞く
        </button>
        <button onClick={() => speak(text)}>話す</button>
      </div>
      <Code text={code} />
    </div>
  );
}
