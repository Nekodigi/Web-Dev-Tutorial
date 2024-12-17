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
