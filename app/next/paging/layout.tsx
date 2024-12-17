"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";

const code = `//以下のようにファイルを配置してください
// /page.tsx
// /layout.tsx
// /sub1/page.tsx
// /sub2/page.tsx

// #start /page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>トップページだよ</p>
      <Link href="/next/paging/sub1" className="underline">
        <p>ページ1へ</p>
      </Link>
      <Link href="/next/paging/sub2" className="underline">
        <p>ページ2へ</p>
      </Link>
    </div>
  );
}
// #end

// #start /layout.tsx
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <p>ヘッダー</p>
      {children}
      <p>フッター</p>
    </div>
  );
}
// #end

// #start /sub1/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>ページ1だよ</p>
      <Link href="/next/paging" className="underline">
        <p>トップページへ</p>
      </Link>
    </div>
  );
}
// #end

// #start /sub2/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>ページ2だよ</p>
      <Link href="/next/paging" className="underline">
        <p>トップページへ</p>
      </Link>
    </div>
  );
}
// #end
`;

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="レイアウト"
        body={`ヘッダーやフッターなど、共通の部分を使いまわすことができます。
          本サンプルは複数ページに分かれているため、コードのコメントをよく見てファイルを配置してください。
        `}
      />
      <p>ヘッダー</p>
      {children}
      <p>フッター</p>
      <Code text={code} />
    </div>
  );
}
