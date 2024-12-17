"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { useSearchParams } from "next/navigation";
//import { useEffect, useMemo, useState } from "react";

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
  const searchParams = useSearchParams();
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="クエリ - ?key=value&..."
        body={`
          URLを使って表示内容を変更させたいときによく使われる、クエリについて解説します。
          クエリは、URLの末尾に?key=valueのような形で記述することで、その値を取得することができます。
          試しに/next/query?age=100&name=山田というURLにアクセスしてみてください。
        `}
        ref="https://reffect.co.jp/react/next-js"
      />
      <div>
        <p>名前は : {searchParams.get("name")}</p>
        <p>年齢は : {searchParams.get("age")}</p>
      </div>
      <Code text={code} />
    </div>
  );
}
