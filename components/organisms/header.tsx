"use client";

import Link from "next/link";
import { ModeToggle } from "../theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
import { Button } from "../ui/button";
import { SiGithub } from "@icons-pack/react-simple-icons";

export const Header = () => {
  const pathName = usePathname();
  return (
    <header className="flex justify-center sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex gap-8 h-16 items-center space-x-4 sm:justify-between sm:space-x-0 px-4">
        <Link href="/">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            モダンWeb開発入門
          </h4>
        </Link>
        {/* <SidebarTrigger /> */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            {pathName.split("/").map((path, index) => {
              if (path === "") {
                return null;
              }
              return (
                <Fragment key={index}>
                  <BreadcrumbItem key={index}>
                    <BreadcrumbLink href={`/${path}`}>{path}</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                </Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-1 items-center justify-end space-x-4">
          <Link href="https://docs.google.com/forms/d/e/1FAIpQLSeznebyOR0TL1MthWluJNNBn9d7VnnXq7YbKB0w5t_NF8M_1Q/viewform?usp=dialog">
            <p className="underline">ご意見 | 質問</p>
          </Link>
          <Button size="icon" variant="ghost" asChild>
            <Link
              href="https://github.com/Nekodigi/Web-Dev-Tutorial"
              target="_blank"
            >
              <SiGithub size={24} />
            </Link>
          </Button>
          <nav className="flex items-center space-x-1">
            <ModeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
};
