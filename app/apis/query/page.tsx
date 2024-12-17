"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const code = `
//! 複数ファイルに分かれているため、コードをコピーする際は注意してください。

// #start /api/query/[slug]/route.ts
import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  return Response.json({ slug, query });
}
// #end

// #start /page.tsx
"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Page() {
  const [resGET, setResGET] = useState("");
  const loaded = useRef(false);

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/query/test?query=sampleQuery");
      const json = await res.json();
      setResGET(json);
    };
    f();
  }, []);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      {loaded && (
        <div>
          <Link href="/api/query/test?query=sampleQuery" className="underline">
            APIへ
          </Link>
          <p>GET結果: {JSON.stringify(resGET)}</p>
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
  const loaded = useRef(false);

  useEffect(() => {
    const f = async () => {
      const res = await fetch("/api/query/test?query=sampleQuery");
      const json = await res.json();
      setResGET(json);
    };
    f();
  }, []);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="APIクエリ - slug/query"
        body={`クエリの章で開設したように、APIでもクエリを受け取ることができます。
          また、/api/query/[slug]のように、[slug]の部分に任意の値を入れて、動作を変えることもできます。
          APIのページにアクセスして、URLによって表示結果が変わることを確認してみましょう。
        `}
        url="https://www.postman.com/"
        urlDesc="Postmanダウンロード"
      />
      {loaded && (
        <div>
          <Link href="/api/query/test?query=sampleQuery" className="underline">
            APIへ
          </Link>
          <p>GET結果: {JSON.stringify(resGET)}</p>
        </div>
      )}
      <Code text={code} />
    </div>
  );
}
