"use client";

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";
import { Description } from "@/components/organisms/description";

import { Code } from "@/components/organisms/code";

const code = `
//! 複数ファイルに分かれているため、コードをコピーする際は注意してください。
//! CLIENT_ID, CLIENT_SECRETの取得は参考資料を参照してください。

// #start /api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };

// #end

// #start /page.tsx
"use client";

import { SessionProvider, useSession, signIn, signOut } from "next-auth/react";

function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className="underline">
          ログアウト
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()} className="underline">
        ログイン
      </button>
    </>
  );
}

function PageWAuth() {
  const { data } = useSession();

  return (
    <div>
      {data?.user ? (
        <p>{data.user.name}さんとしてログイン中</p>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <SessionProvider>
        <PageWAuth />
        <LoginBtn />
      </SessionProvider>
    </div>
  );
}
// #end
`;

function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <button onClick={() => signOut()} className="underline">
          ログアウト
        </button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()} className="underline">
        ログイン
      </button>
    </>
  );
}

function PageWAuth() {
  const { data } = useSession();

  return (
    <div>
      {data?.user ? (
        <p>{data.user.name}さんとしてログイン中</p>
      ) : (
        <p>ログインしてください</p>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="ユーザー認証基礎 - NextAuth"
        body={`
          ユーザーの認証を安全かつ簡単に実装するためのライブラリがNextauthです。
          メール認証をはじめ、GoogleやFacebookなどのSNS認証にも対応しています。
          以下のコマンドでインストールしてください。
          pnpm add next-auth
          また、認証に必要な環境変数を設定する必要があるため、参考資料を参照して取得してください。
        `}
        url="https://zenn.dev/aya1357/articles/bb291f8b4a31cb"
        urlDesc="Google認証ガイド"
      />
      <SessionProvider>
        <PageWAuth />
        <LoginBtn />
      </SessionProvider>
      <Code text={code} />
    </div>
  );
}
