import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware.util";
import { createAdmin } from "./utils/supabase/admin";

export async function middleware(request: NextRequest) {
  const supabaseAdmin = createAdmin();
  const { response, supabase } = updateSession(request);
  const { pathname: requestPath } = request.nextUrl;

  const user = await supabase.auth.getUser().then(({ data }: any) => data.user);
  const sendToAuth = () =>
    NextResponse.redirect(new URL("/auth/signin", request.url));

  if (user) {
    // If the user is at a URL that starts with auth
    if (requestPath.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/account/mypage", request.url));
    }

    // check username
    const { data: usernameData, error: usernameError } = await supabaseAdmin
      .from("users")
      .select("username")
      .eq("id", user.id);

    if (usernameError) {
      console.log(usernameError);
      return;
    }

    if (!usernameData.length) {
      if (
        requestPath.startsWith("/account/setUserInfo") ||
        requestPath.startsWith("/account/mypage")
      ) {
        return response;
      }
      return NextResponse.redirect(
        new URL("/account/setUserInfo", request.url)
      );
    }

    return response;
  } else {
    // If the user is not at a URL that starts with auth
    if (requestPath.startsWith("/auth")) return response;
    return sendToAuth();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:text|js|svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
