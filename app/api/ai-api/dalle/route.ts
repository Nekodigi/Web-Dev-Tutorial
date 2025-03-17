import { NextRequest } from "next/server";
import OpenAI from "openai";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const input = searchParams.get("input");
  const apiKey = searchParams.get("apiKey");
  if (!input || !apiKey)
    return Response.json(
      { error: "input and apiKey is required" },
      { status: 400 }
    );
  const openai = new OpenAI({ apiKey });

  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: "a white siamese cat",
    n: 1,
    size: "1024x1024",
  });
  const output = response.data[0].url;
  return Response.json({ output });
}
