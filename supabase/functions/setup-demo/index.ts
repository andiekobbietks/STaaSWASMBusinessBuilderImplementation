// The former demo bootstrap endpoint used the Supabase service-role key to
// create, delete and reset a shared demo account. It is intentionally retired.
// Keep this inert response so stale clients fail closed after redeployment.
Deno.serve((_req: Request) => {
  return new Response(
    JSON.stringify({
      ok: false,
      error: "Demo account provisioning has been disabled.",
    }),
    {
      status: 410,
      headers: { "Content-Type": "application/json" },
    },
  );
});
