"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import Link from "next/link";
import { use, useEffect, useMemo, useRef, useState } from "react";

const code = `
//! 複数ファイルに分かれているため、コードをコピーする際は注意してください。

// #start /app/.env.local
SERVER_ENV="server secret"
NEXT_PUBLIC_CLIENT_ENV="client secret"
// #end

// #start /app/api/secret/route.ts
export async function GET() {
  const server_secret = process.env.SERVER_ENV;
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_ENV;
  return Response.json({ server_secret, client_secret });
}
// #end

// #start /app/page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [serverSecret, setServerSecret] = useState({});
  const loaded = useRef(false);

  const secret = {
    client_secret: process.env.NEXT_PUBLIC_CLIENT_ENV,
    server_secret: process.env.SERVER_ENV,
  };

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();
      setServerSecret(json);
      loaded.current = true;
    };
    f();
    console.log(process.env.NEXT_PUBLIC_CLIENT_SECRET);
  }, []);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      {loaded && (
        <div>
          <Link href="/api/basic" className="underline">
            APIへ
          </Link>
          <p>ブラウザからアクセスした場合: {JSON.stringify(secret)}</p>
          <p>サーバーからアクセスした場合: {JSON.stringify(serverSecret)}</p>
        </div>
      )}
      <Code text={code} />
    </div>
  );
}
// #end
`;

export default function Page() {
  const [serverSecret, setServerSecret] = useState({});
  const loaded = useRef(false);

  const secret = {
    client_secret: process.env.NEXT_PUBLIC_CLIENT_ENV,
    server_secret: process.env.SERVER_ENV,
  };

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/secret");
      const json = await res.json();
      setServerSecret(json);
      loaded.current = true;
    };
    f();
    console.log(process.env.NEXT_PUBLIC_CLIENT_SECRET);
  }, []);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="環境変数 - .env.local"
        body={`
          環境変数は、漏洩してはいけない情報を安全に管理するために使うことができます。
          プロジェクトのルートディレクトリに.envファイルを作成すると、その中に記述された環境変数を読み取ることができます。
          この機密情報が書かれたファイルは、.gitignoreに記述して絶対に外部に公開されないようにする必要があります。
          基本的に、環境変数はサーバーのみ読み取ることができますが、先頭にNEXT_PUBLIC_をつけることで、ブラウザ側でも読み取ることができます。
        `}
        url="https://reffect.co.jp/laravel/env-file-basic-understanding"
      />
      {loaded && (
        <div>
          <Link href="/api/basic" className="underline">
            APIへ
          </Link>
          <p>ブラウザからアクセスした場合: {JSON.stringify(secret)}</p>
          <p>サーバーからアクセスした場合: {JSON.stringify(serverSecret)}</p>
        </div>
      )}
      <Code text={code} />
    </div>
  );
}
