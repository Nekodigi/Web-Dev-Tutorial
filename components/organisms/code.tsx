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

type CodeProps = {
  text: string;
};
export const Code = ({ text }: CodeProps) => {
  const copyBlockProps = {
    text: text,
    language: "tsx",
    showLineNumbers: true,
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>コードを見る</Button>
      </DialogTrigger>
      <DialogContent className="max-h-screen max-w-screen flex flex-col">
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
          <Button type="submit">閉じる</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
