"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const code = `"use client";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function Page() {
  const [open, setOpen] = useState(false);
  const things = [
    { name: "リンゴ", value: "apple" },
    { name: "バナナ", value: "banana" },
    { name: "パソコン", value: "pc" },
    { name: "高級車", value: "car" },
    { name: "家", value: "house" },
  ];
  const [item, setItem] = useState(things[0].value);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日までに
        {things.find((thing) => thing.value === item)?.name}を手に入れる!
      </h3>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>編集</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>買いたいもの</DialogTitle>
            <DialogDescription>
              買いたい物と、何日までに手に入れたいかを書いてください。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select value={item} onValueChange={setItem}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="買いたいものを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>買いたいもの</SelectLabel>
                  {things.map((thing) => (
                    <SelectItem
                      key={thing.value}
                      value={thing.value}
                      onClick={() => setItem(thing.value)}
                    >
                      {thing.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate as any}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setOpen(false)}>
              変更を保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

`;

export default function Page() {
  const [open, setOpen] = useState(false);
  const things = [
    { name: "リンゴ", value: "apple" },
    { name: "バナナ", value: "banana" },
    { name: "パソコン", value: "pc" },
    { name: "高級車", value: "car" },
    { name: "家", value: "house" },
  ];
  const [item, setItem] = useState(things[0].value);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="特殊要素 - dialog/select..."
        body={`UIフレームワークを使うと、自力では実装が難しい複雑な要素も簡単に利用できます。
          ここで紹介できるのは、ごく一部のため、公式ドキュメントを参照して、さまざまな要素を試してみてください。
        `}
        url="https://ui.shadcn.com/docs/components/dialog"
      />
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        {date.getFullYear()}年{date.getMonth() + 1}月{date.getDate()}日までに
        {things.find((thing) => thing.value === item)?.name}を手に入れる!
      </h3>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>編集</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>買いたいもの</DialogTitle>
            <DialogDescription>
              買いたい物と、何日までに手に入れたいかを書いてください。
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Select value={item} onValueChange={setItem}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="買いたいものを選択" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>買いたいもの</SelectLabel>
                  {things.map((thing) => (
                    <SelectItem
                      key={thing.value}
                      value={thing.value}
                      onClick={() => setItem(thing.value)}
                    >
                      {thing.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)} //date && とすることで、nullの場合はsetDateを実行しない
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setOpen(false)}>
              変更を保存
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Code text={code} />
    </div>
  );
}
