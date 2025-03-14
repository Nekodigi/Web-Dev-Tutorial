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
      <Link href="/sub1" className="underline">
        <p>ページ1へ</p>
      </Link>
      <Link href="/sub2" className="underline">
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
    <html>
      <body>
        <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
          <p>ヘッダー</p>
          {children}
          <p>フッター</p>
        </div>
      </body>
    </html>
  );
}
// #end

// #start /sub1/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <div>
      <p>ページ1だよ</p>
      <Link href="/" className="underline">
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
      <Link href="/" className="underline">
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
        title="レイアウト - layout.tsx"
        body={`ヘッダーやフッターなど、共通の部分を再利用することができます。
          高速で遷移するため分かりにくいですが、URLを見ると確かにページが切り替わっていることがわかります。
          本サンプルは複数ページに分かれているため、コードのコメントをよく見てファイルを配置してください。
        `}
        url="https://reffect.co.jp/react/next-js"
      />
      <p>ヘッダー</p>
      {children}
      <p>フッター</p>
      <Code text={code} />
    </div>
  );
}
