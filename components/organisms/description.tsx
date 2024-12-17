import { Button } from "../ui/button";

type DescriptionProps = {
  title: string;
  body: string;
  url?: string;
  withoutSample?: boolean;
};

export const Description = ({
  title,
  body,
  url,
  withoutSample,
}: DescriptionProps) => {
  return (
    <div className="flex-col max-w-[512px] mb-8">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
        {title}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6 whitespace-pre-line">
        {body}
      </p>
      {url && (
        <div className="flex justify-end">
          <Button asChild>
            <a href={url} target="_blank">
              参考情報
            </a>
          </Button>
        </div>
      )}
      {!withoutSample && (
        <h2 className="scroll-m-20 mt-10 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
          以下サンプル
        </h2>
      )}
    </div>
  );
};
