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
