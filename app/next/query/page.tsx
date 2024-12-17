"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const code = `"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ParamsDependent() {
  const searchParams = useSearchParams();
  return (
    <div>
      <p>名前は : {searchParams.get("name")}</p>
      <p>年齢は : {searchParams.get("age")}</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Suspense fallback={<div>loading...</div>}>
        <ParamsDependent />
      </Suspense>
      <Code text={code} />
    </div>
  );
}`;

function ParamsDependent() {
  const searchParams = useSearchParams();
  return (
    <div>
      <p>名前は : {searchParams.get("name")}</p>
      <p>年齢は : {searchParams.get("age")}</p>
    </div>
  );
}

export default function Page() {
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="クエリ - ?key=value&..."
        body={`
          URLを使って表示内容を変更させたいときによく使われる、クエリについて解説します。
          クエリは、URLの末尾に?key=valueのような形で記述することで、その値を取得することができます。
          試しに/next/query?age=100&name=山田というURLにアクセスしてみてください。
          注意点として、useSearchParamsはSuspenseの中に存在する必要があります。
        `}
        url="https://reffect.co.jp/react/next-js"
      />
      <Suspense fallback={<div>loading...</div>}>
        <ParamsDependent />
      </Suspense>
      <Code text={code} />
    </div>
  );
}
