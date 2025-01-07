"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { useEffect, useState } from "react";

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

type userData = {
  name: string;
  hobby: string;
};

//set()関数は既に存在する場合は上書き、ない場合は新規作成が自動で行われるため、CREATEとUPDATEを兼ねており、POSTのみで対応可能
//  {merge: true}を追加することで、既存のデータを保持しつつ、新しいデータを追加することも可能

//create()関数は既に存在する場合はエラーを返すため、CREATEのみに対応している
//update()関数は既に存在しない場合はエラーを返すため、UPDATEのみに対応している　挙動はset(, {merge: true})と似ている
export async function POST(req: NextRequest) {
  const data: userData = await req.json();
  try {
    //
    await db.collection("test").doc(data.name).set(data);
    //もしくは await db.collection("test").add(data);とすると自動でIDが生成される
    return Response.json({ data: "update succeeded" });
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId: string | null = searchParams.get("userId");
  if (!userId)
    return Response.json({ error: "userId is required" }, { status: 400 });
  const doc = await db.collection("test").doc(userId).get();
  const data = doc.data();
  if (!data) return Response.json({ error: "user not found" }, { status: 404 });

  return Response.json({ data });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const userId: string | null = searchParams.get("userId");
  if (!userId)
    return Response.json({ error: "userId is required" }, { status: 400 });
  try {
    await db.collection("test").doc(userId).delete();
    return Response.json({ data: "deleted" });
  } catch (e) {
    return Response.json({ error: e }, { status: 500 });
  }
}
// #end

// #start /app/page.tsx
"use client";

import { useEffect, useState } from "react";

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
          placeholder="ユーザーを検索..."
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

type User = {
  name: string;
  hobby: string;
};

export default function Page() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState<User[]>([]);

  const onSearchUser = async (query: string) => {
    // use api
    const res = await fetch(`/api/firebase/search?query=${query}`);
    setResponse((await res.json()).data);
  };

  useEffect(() => {
    //timeout
    const timeout = setTimeout(() => {
      onSearchUser(query);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="検索 - where()"
        body={`大量のデータから目的の情報を探すためには検索機能が必要です。
          データベースでは、検索条件を示したクエリを用いてデータを取得します。
        `}
        url="https://firebase.google.com/docs/firestore/query-data/queries"
      />
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ユーザーを検索..."
          className="border"
        />
        <p>サーバーからの応答</p>
        {JSON.stringify(response)}
      </div>
      <Code text={code} />
    </div>
  );
}
