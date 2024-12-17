import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CodeBlock } from "react-code-blocks";
import Link from "next/link";
import { useState } from "react";

type CodeProps = {
  text: string;
};
export const Code = ({ text }: CodeProps) => {
  const copyBlockProps = {
    text: text,
    language: "tsx",
    showLineNumbers: true,
  };
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>コードを見る</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-[800px] flex flex-col">
        <DialogHeader>
          <DialogTitle>コード</DialogTitle>
          <DialogDescription>
            動かし方は
            <Link href="/" className="underline">
              こちら
            </Link>
          </DialogDescription>
        </DialogHeader>

        <CodeBlock {...copyBlockProps} />
        <DialogFooter>
          <Button type="submit" onClick={() => setOpen(false)}>
            閉じる
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
