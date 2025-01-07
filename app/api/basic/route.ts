export async function GET() {
  const data = "GET request received!";
  return Response.json({ data });
}

export async function POST(req: Request) {
  const data = "POST request received!";
  const { messages } = await req.json();
  return Response.json({ data, messages });
}
