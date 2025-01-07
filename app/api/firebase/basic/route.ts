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

const db = getFirestore();

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
