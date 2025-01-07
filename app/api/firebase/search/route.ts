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
