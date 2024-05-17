import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware.util";

export async function middleware(request: NextRequest) {
  const { response, supabase } = updateSession(request);
  const { pathname: requestPath } = request.nextUrl;
  
  const user = await supabase.auth.getUser().then(({ data }: any) => data.user);
  const sendToAuth = () =>
  NextResponse.redirect(new URL("/auth/signin", request.url));

  if (user) {
    // auth로 시작하는 url에 user가 있으면 이 있으면, account/mypage로
    if (requestPath.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/account/mypage", request.url));
    }
    return response;
  } else {
    // auth로 시작하는 url에 user가 없으면 그대로 넘김
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
