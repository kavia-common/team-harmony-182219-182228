export const dynamic = "force-static";

/**
 * PUBLIC_INTERFACE
 * GET /api/health
 * Minimal health check endpoint for sanity testing. Returns { status: "ok" }.
 */
export async function GET() {
  return new Response(JSON.stringify({ status: "ok" }), {
    headers: { "content-type": "application/json" },
    status: 200,
  });
}
