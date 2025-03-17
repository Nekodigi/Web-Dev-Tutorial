import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import Link from "next/link";
import { list } from "postcss";

export function AppSidebar() {
  const pages = [
    {
      name: "React",
      list: [
        { name: "状態管理 - useState", path: "/react/hook" },
        { name: "配列 - [...array]", path: "/react/array" },
        { name: "コンポーネント - </>", path: "/react/component" },
        { name: "値の保存 - localStorage", path: "/react/localStorage" },
      ],
    },
    {
      name: "Next.js",
      list: [
        {
          name: "クエリ - ?key=value&...",
          path: "/next/query?name=山田太郎&age=1000",
        },
        {
          name: "レイアウト - layout.tsx",
          path: "/next/paging",
        },
      ],
    },
    {
      name: "Shadcn",
      list: [
        { name: "基本要素 - button/input", path: "/shadcn/basic" },
        { name: "特殊要素 - dialog/select...", path: "/shadcn/special" },
      ],
    },
    {
      name: "API",
      list: [
        { name: "API基礎 - GET/POST...", path: "/apis/basic" },
        {
          name: "APIクエリ - slug/query",
          path: "/apis/query",
        },
        {
          name: "環境変数 - .env",
          path: "/apis/secret",
        },
      ],
    },
    {
      name: "Firestore",
      list: [
        { name: "CRUD操作 - create/read...", path: "/firebase/basic" },
        { name: "検索 - where()", path: "/firebase/search" },
      ],
    },
    {
      name: "NextAuth",
      list: [{ name: "ユーザー認証 - NextAuth", path: "/auth/routing" }],
    },
    {
      name: "Web APIs",
      list: [
        { name: "音声認識/合成 - Web Speech API", path: "/web-api/speech" },
      ],
    },
    {
      name: "AI API",
      list: [
        { name: "文章生成 - ChatGPT API", path: "/ai-api/chatgpt-text" },
        {
          name: "マルチモーダル - ChatGPT API",
          path: "/ai-api/chatgpt-multimodal",
        },
        { name: "画像生成 - DALL-E API", path: "/ai-api/dalle" },
      ],
    },
    {
      name: "MediaPipe",
      list: [
        { name: "全身検出 - Holistic", path: "/mediaPipe/mp-holistic" },
        { name: "物体検出 - Object Detection", path: "/mediaPipe/mp-object" },
        { name: "背景除去 - SAM", path: "/mediaPipe/mp-sam" },
        { name: "ジェスチャー - Gesture", path: "/mediaPipe/mp-gesture" },
        { name: "特徴量ベクトル - Embedding", path: "/mediaPipe/mp-embed" },
        { name: "文章分類 - Text Class", path: "/mediaPipe/mp-textClass" },
        { name: "文章特徴量 - Text Embed", path: "/mediaPipe/mp-textEmbed" },
      ],
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarMenuButton asChild>
          <Link href="/">
            <Home />
            ホーム
          </Link>
        </SidebarMenuButton>
        {pages.map((group, index) => (
          <SidebarGroup key={index}>
            <SidebarGroupLabel>{group.name}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.list.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link href={item.path}>{item.name}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
