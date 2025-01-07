"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import Link from "next/link";
import { use, useEffect, useMemo, useRef, useState } from "react";

const code = `
//! 複数ファイルに分かれているため、コードをコピーする際は注意してください。

// #start /api/basic/route.ts
export async function GET() {
  const data = "GET request received!";
  return Response.json({ data });
}

export async function POST(req: Request) {
  const data = "POST request received!";
  const { messages } = await req.json();
  return Response.json({ data, messages });
}
// #end

// #start /page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [resGET, setResGET] = useState("");
  const [resPOST, setResPOST] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/basic");
      const json = await res.json();
      setResGET(json);
      const res2 = await fetch("/api/basic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: "サンプルメッセージ" }),
      });
      const json2 = await res2.json();
      setResPOST(json2);
      loaded.current = true;
    };
    f();
  }, []);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      {loaded && (
        <div>
          <Link href="/api/basic" className="underline">
            APIへ
          </Link>
          <p>GET結果: {JSON.stringify(resGET)}</p>
          <p>POST結果: {JSON.stringify(resPOST)}</p>
        </div>
      )}
      <Code text={code} />
    </div>
  );
}
// #end
`;

export default function Page() {
  const [resGET, setResGET] = useState("");
  const [resPOST, setResPOST] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/basic");
      const json = await res.json();
      setResGET(json);
      const res2 = await fetch("/api/basic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: "サンプルメッセージ" }),
      });
      const json2 = await res2.json();
      setResPOST(json2);
      loaded.current = true;
    };
    f();
  }, []);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="API基礎 - GET/POST..."
        body={`Webブラウザには性能やセキュリティ面で制限があるため、APIを使って外部サーバーと通信することが一般的です。
          GETメドッドであれば、Webブラウザから簡単に動作確認ができますが。POSTメソッドなどは、Postmanなどのツールを使って確認することが一般的です。
          /api/basicに、GET、POSTを使ってアクセスしてみてください。
          また、このサンプルでは、POSTメソッドでJSON形式のデータを送信できます。
          本サンプルは、複数ページに分かれているため、コードのコメントをよく見てファイルの配置してください。
        `}
        url="https://www.postman.com/"
        urlDesc="Postmanダウンロード"
      />
      {loaded && (
        <div>
          <Link href="/api/basic" className="underline">
            APIへ
          </Link>
          <p>GET結果: {JSON.stringify(resGET)}</p>
          <p>POST結果: {JSON.stringify(resPOST)}</p>
        </div>
      )}
      <Code text={code} />
    </div>
  );
}
