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
