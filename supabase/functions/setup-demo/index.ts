import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    const email = "demo@businessbuilder.app";
    const password = "demo123456";

    // Try to sign in first — if it works, user already exists
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInData.session && !signInError) {
      return new Response(
        JSON.stringify({ ok: true, message: "Demo user already exists and credentials work" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // User doesn't exist or credentials wrong — create via admin API
    const { data: createData, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { name: "Demo User" },
    });

    if (createError) {
      // If user exists but password is wrong, try to update the password
      if (createError.message.includes("already") || createError.message.includes("registered")) {
        // Delete and recreate
        const { data: existingUsers } = await supabase.auth.admin.listUsers();
        const existing = existingUsers?.users?.find((u: { email: string }) => u.email === email);
        if (existing) {
          await supabase.auth.admin.deleteUser(existing.id);
        }

        const { data: recreateData, error: recreateError } = await supabase.auth.admin.createUser({
          email,
          password,
          email_confirm: true,
          user_metadata: { name: "Demo User" },
        });

        if (recreateError) {
          return new Response(
            JSON.stringify({ ok: false, error: recreateError.message }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }

        void recreateData;
        return new Response(
          JSON.stringify({ ok: true, message: "Demo user recreated with correct password" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } },
        );
      }

      return new Response(
        JSON.stringify({ ok: false, error: createError.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    void createData;
    return new Response(
      JSON.stringify({ ok: true, message: "Demo user created successfully" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
