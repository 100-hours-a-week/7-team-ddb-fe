export async function GET() {
  return new Response(
    JSON.stringify({
      status: 'OK',
      message: 'Application is healthy',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}
