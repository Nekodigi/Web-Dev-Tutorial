import { NextRequest } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const slug = (await params).slug;
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get("query");
  return Response.json({ slug, query });
}
