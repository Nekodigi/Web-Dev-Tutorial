"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";

const code = `"use client";

import { useState } from "react";

export default function Page() {
  const [text, setText] = useState(localStorage.getItem("text") || "");

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div className="flex flex-col gap-4 items-end">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メモを入力..."
          className="border"
        />
      </div>
      <Code text={code} />
    </div>
  );
}
`;

export default function Page() {
  const [text, setText] = useState(localStorage.getItem("text") || "");

  useEffect(() => {
    localStorage.setItem("text", text);
  }, [text]);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="値の保存 - localStorage"
        body={`厳密にはWebブラウザもつ機能ですが、データをサーバーを使わずともWebブラウザに記録しておける便利機能です。
          主に、ログイン情報の保存やキャッシュデータの保存に使われます。
          文字を入力し、ページを開きなおしても値が保持されていることを確認してみてください。
        `}
      />
      <div className="flex flex-col gap-4 items-end">
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="メモを入力..."
          className="border"
        />
      </div>
      <Code text={code} />
    </div>
  );
}
