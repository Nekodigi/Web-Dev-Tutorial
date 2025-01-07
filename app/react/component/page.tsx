"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { useState } from "react";

const code = `"use client";

import { useState } from "react";

type ComponentProps = {
  index: number;
  value: string;
  onClick: () => void;
};
const Component = ({ index, value, onClick }: ComponentProps) => {
  return (
    <li onClick={() => onClick()}>
      <p className="mt-6 border-l-2 pl-6 italic">
        {index} : {value}
      </p>
    </li>
  );
};

export default function Page() {
  const [list, setList] = useState<string[]>(["アイテム1", "アイテム2"]);
  const [text, setText] = useState("");

  const onAppend = () => {
    setList([...list, text]);
    setText("");
  };
  const onDelete = (value: string) => {
    setList(list.filter((item) => item !== value));
  };
  const onUpdate = (value: string) => {
    setList(list.map((item) => (item === value ? "更新" : item)));
  };
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <div>
        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="値を入力"
          />
          <button onClick={() => onAppend()}>リストに追加</button>
        </div>
        <ul>
          {list.map((item, index) => (
            // onDelete/onUpdateを切り替えて試してみて!
            <Component
              key={index}
              onClick={() => onDelete(item)}
              index={index}
              value={item}
            />
          ))}
        </ul>
      </div>
      <Code text={code} />
    </div>
  );
}

`;

type ComponentProps = {
  index: number;
  value: string;
  onClick: () => void;
};
const Component = ({ index, value, onClick }: ComponentProps) => {
  return (
    <li onClick={() => onClick()}>
      <p className="mt-6 border-l-2 pl-6 italic">
        {index} : {value}
      </p>
    </li>
  );
};

export default function Page() {
  const [list, setList] = useState<string[]>(["アイテム1", "アイテム2"]);
  const [text, setText] = useState("");

  const onAppend = () => {
    setList([...list, text]);
    setText("");
  };
  const onDelete = (value: string) => {
    setList(list.filter((item) => item !== value));
  };
  const onUpdate = (value: string) => {
    setList(list.map((item) => (item === value ? "更新" : item)));
  };
  return (
    <div className="h-[640px] flex flex-col gap-8 items-center mt-16">
      <Description
        title="コンポーネント - </>"
        body={`コンポーネントは、同じ要素を繰り返し使いたいときに便利です。
          また、機能ごとにファイルを分割して整理できるのもメリットです。
  
        `}
      />
      <div>
        <div>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="値を入力"
            className="border"
          />
          <button onClick={() => onAppend()} className="underline">
            リストに追加
          </button>
        </div>
        <ul>
          {list.map((item, index) => (
            // onDelete/onUpdateを切り替えて試してみて!
            <Component
              key={index}
              onClick={() => onDelete(item)}
              index={index + 1}
              value={item}
            />
          ))}
        </ul>
      </div>
      <Code text={code} />
    </div>
  );
}
