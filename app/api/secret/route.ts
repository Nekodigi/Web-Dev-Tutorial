export async function GET() {
  const server_secret = process.env.SERVER_ENV;
  const client_secret = process.env.NEXT_PUBLIC_CLIENT_ENV;
  return Response.json({ server_secret, client_secret });
}
