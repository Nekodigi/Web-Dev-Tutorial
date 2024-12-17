"use client";

import { Code } from "@/components/organisms/code";
import { Description } from "@/components/organisms/description";
import { useState } from "react";

const code = `"use client";

import { useState } from "react";

export default function Page() {
  //変数は基本的にすべてuseStateで管理する。
  //set**で値を変更したときに、値が保存され表示内容も変わる
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
            <li key={index} onClick={() => onDelete(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Code text={code} />
    </div>
  );
}

`;

export default function Page() {
  //変数は基本的にすべてuseStateで管理する。
  //set**で値を変更したときに、値が保存され表示内容も変わる
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
        title="配列 - [...array]"
        body={`配列も、useStateを使って管理することができます。
          しかし、[...oldArray]のように、明示的に新しい配列を作成しないと、setStateで変更が検知されないことに注意が必要です。
          オブジェクトについても同様の注意が必要です。
          削除、更新は、filter,map等を用いた複雑な処理が必要なため、コードを確認して理解を深めてください。
        `}
        ref="https://cat-form-2c7.notion.site/JavaScript-158c8df8f8f9805badcef9335d254e64?pvs=4"
      />
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
            <li key={index} onClick={() => onDelete(item)}>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Code text={code} />
    </div>
  );
}
