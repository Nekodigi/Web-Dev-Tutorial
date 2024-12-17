"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { useEffect, useMemo, useState } from "react";

const code = `"use client";

import { useEffect, useMemo, useState } from "react";

export default function Page() {
  //変数は基本的にすべてuseStateで管理する。
  //set**で値を変更したときに、値が保存され表示内容も変わる
  const [count, setCount] = useState(0);
  //他の変数をもとに導出できる値を定義
  const evenOrOdd = useMemo(() => {
    return count % 2 === 0 ? "偶数" : "奇数";
  }, [count]); //[]内に依存する変数を指定。いずれかが更新されると再計算
  //変数更新タイミングで実行したい処理を記述
  useEffect(() => {
    console.log(\`値が \${count} に変更されました！\`);
  }, [count]); //空配列を指定することで、初回起動時のみ実行

  return (
    <div className="h-screen flex justify-center items-center">
      <div>
        <p>
          {count} は {evenOrOdd}
        </p>
        <button onClick={() => setCount(count + 1)}>値を増やす！</button>
      </div>
    </div>
  );
}`;

export default function Page() {
  //変数は基本的にすべてuseStateで管理する。
  //set**で値を変更したときに、値が保存され表示内容も変わる
  const [count, setCount] = useState(0);
  //他の変数をもとに導出できる値を定義
  const evenOrOdd = useMemo(() => {
    return count % 2 === 0 ? "偶数" : "奇数";
  }, [count]); //[]内に依存する変数を指定。いずれかが更新されると再計算
  //変数更新タイミングで実行したい処理を記述
  useEffect(() => {
    console.log(`値が ${count} に変更されました！`);
  }, [count]); //空配列を指定することで、初回起動時のみ実行

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="状態管理 - useState"
        body={`useState, useMemo, useEffectの3つのフックを使った、状態管理のサンプルプログラムです。
        ほとんどの変数はuseStateを使って管理します。setで値を更新すると、表示内容が自動的に更新されます。
        useMemoは、計算結果を保存するために用いられます。
        useEffectは、変数更新タイミングで実行するときに使います。何も記載しない場合は、ページを開いた時のみ実行されます。
        `}
        url="https://reffect.co.jp/react/react-hook-usestate-understand"
      />
      <div>
        <p>
          {count} は {evenOrOdd}
        </p>
        <button onClick={() => setCount(count + 1)} className="underline">
          ここをクリックして値を増やす！
        </button>
      </div>
      <Code text={code} />
    </div>
  );
}
