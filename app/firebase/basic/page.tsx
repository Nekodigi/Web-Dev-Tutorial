"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { useState } from "react";

const code = `
//! 複数ファイルに分かれているため、コードをコピーする際は注意してください。
//! また、Firebaseのサービスアカウントを取得し、環境変数に記載してください。

// #start /app/.env.local
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
SA_CLIENT_EMAIL=
SA_PRIVATE_KEY=
SA_PROJECT_ID=
// #end

// #start /app/api/firebase/basic/route.ts
import { getFirestore } from "firebase-admin/firestore";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { NextRequest } from "next/server";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.SA_PROJECT_ID,
      clientEmail: process.env.SA_CLIENT_EMAIL,
      //privateKey: process.env.SA_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      privateKey: process.env.SA_PRIVATE_KEY,
    }),
  });
  getFirestore().settings({ ignoreUndefinedProperties: true });
}

export const db = getFirestore();

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query: string | null = searchParams.get("query");
  if (!query) {
    //queryがない場合は一覧を返す
    const doc = await db.collection("test").limit(10).get();
    const data = doc.docs.map((doc) => doc.data());
    if (!data)
      return Response.json({ error: "user not found" }, { status: 404 });
  }

  const doc = await db
    .collection("test")
    .where("name", ">=", query) //この記法を用いることで、文字列の部分一致を検出することができます。
    .where("name", "<=", query + "\uf8ff")
    .limit(10)
    .get();
  const data = doc.docs.map((doc) => doc.data().name);
  if (!data) return Response.json({ error: "user not found" }, { status: 404 });

  return Response.json({ data });
}
// #end

// #start /app/page.tsx
"use client";

import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [response, setResponse] = useState("");

  const onUpdateUser = async () => {
    // use api
    const res = await fetch("/api/firebase/basic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, hobby }),
    });
    setResponse(await res.json());
  };
  const onReadUser = async () => {
    const res = await fetch("/api/firebase/basic?userId=" + name);
    setResponse(await res.json());
  };
  const onDeleteUser = async () => {
    const res = await fetch("/api/firebase/basic?userId=" + name, {
      method: "DELETE",
    });
    setResponse(await res.json());
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ユーザー名を入力"
          className="border"
        />
        <input
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          placeholder="趣味を入力"
          className="border"
        />
        <div className="flex gap-4">
          <button onClick={() => onUpdateUser()} className="underline">
            Create/Update
          </button>
          <button onClick={() => onReadUser()} className="underline">
            Read
          </button>
          <button onClick={() => onDeleteUser()} className="underline">
            Delete
          </button>
        </div>
        <p>サーバーからの応答</p>
        <p>{JSON.stringify(response)}</p>
      </div>
    </div>
  );
}
// #end

`;

export default function Page() {
  const [name, setName] = useState("");
  const [hobby, setHobby] = useState("");
  const [response, setResponse] = useState("");

  const onUpdateUser = async () => {
    // use api
    const res = await fetch("/api/firebase/basic", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, hobby }),
    });
    setResponse(await res.json());
  };
  const onReadUser = async () => {
    const res = await fetch("/api/firebase/basic?userId=" + name);
    setResponse(await res.json());
  };
  const onDeleteUser = async () => {
    const res = await fetch("/api/firebase/basic?userId=" + name, {
      method: "DELETE",
    });
    setResponse(await res.json());
  };

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="データベース - CRUD操作"
        body={`データベースは多くのWebアプリで使用される重要な機能です。
        このページでは、データベースの基本的な操作であるCreate, Read, Update, Deleteを学びます。APIには、それぞれPOST, GET, PUT, DELETEの4つの指令を送ることで、データベースの操作を行います。
        今回は、GoogleのFirestoreというNoSQLデータベースを使用します。参考資料を参考にして、サービスアカウントを取得してください。
        サービスアカウントに記載されている値を、プログラムのコメント欄と、環境変数の章を参考にしながら、安全に記載してください。
        また、以下のコマンドで必要ライブラリをインストールしてください。
        pnpm add firebase-admin
        データが作成されると、firestoreのコンソールに反映されるため、そちらも確認してみてください。
        `}
        url="https://go-tech.blog/nodejs/firebase-firestore-operation/"
      />
      <div>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ユーザー名を入力"
          className="border"
        />
        <input
          value={hobby}
          onChange={(e) => setHobby(e.target.value)}
          placeholder="趣味を入力"
          className="border"
        />
        <div className="flex gap-4">
          <button onClick={() => onUpdateUser()} className="underline">
            Create/Update
          </button>
          <button onClick={() => onReadUser()} className="underline">
            Read
          </button>
          <button onClick={() => onDeleteUser()} className="underline">
            Delete
          </button>
        </div>
        <p>サーバーからの応答</p>
        <p>{JSON.stringify(response)}</p>
      </div>
      <Code text={code} />
    </div>
  );
}
