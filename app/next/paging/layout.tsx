export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="h-screen w-full flex-col">
      <p>共通部分だよー</p>
      {children}
    </div>
  );
}
