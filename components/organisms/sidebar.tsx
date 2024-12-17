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

export function AppSidebar() {
  const pages = [
    {
      name: "React",
      list: [
        { name: "状態管理 - useState", path: "/react/hook" },
        { name: "配列 - [...array]", path: "/react/array" },
        { name: "コンポーネント - </>", path: "/react/component" },
      ],
    },
    {
      name: "Next",
      list: [
        {
          name: "クエリ - ?key=value&...",
          path: "/next/query?name=山田太郎&age=1000",
        },
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
