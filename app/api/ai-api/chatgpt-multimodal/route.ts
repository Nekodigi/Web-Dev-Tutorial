import { NextRequest } from "next/server";
import OpenAI from "openai";
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get("input");
  const inputImage = searchParams.get("inputImage");
  if (!input || !inputImage)
    return Response.json({ error: "input is required" }, { status: 400 });
  const completion = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: input },
          {
            type: "image_url",
            image_url: {
              url: inputImage,
            },
          },
        ],
      },
    ],
  });
  const output = completion.choices[0].message.content;
  return Response.json({ output });
}
