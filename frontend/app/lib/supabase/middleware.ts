import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/dashboard",
  "/data-master",
  "/operasional",
  "/penjualan",
  "/marketplace",
  "/keuangan",
  "/laporan",
  "/pengaturan",
  "/kasir",
];

const OWNER_ONLY_PREFIXES = [
  "/dashboard",
  "/data-master/bahan-baku",
  "/data-master/supplier",
  "/data-master/resep",
  "/operasional",
  "/penjualan",
  "/marketplace",
  "/keuangan",
  "/laporan",
  "/pengaturan",
];

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: Avoid writing code between createServerClient and supabase.auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (isProtected && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Server-side role enforcement: prevent Cashier from accessing Owner routes
  if (user && OWNER_ONLY_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role, is_active")
      .eq("id", user.id)
      .single();

    if (!profile || !profile.is_active || profile.role !== "owner") {
      const kasirUrl = request.nextUrl.clone();
      kasirUrl.pathname = "/kasir/dashboard";
      return NextResponse.redirect(kasirUrl);
    }
  }

  return supabaseResponse;
}
