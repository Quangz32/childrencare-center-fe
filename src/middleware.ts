import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./utils/jwtUtils";

export async function middleware(request: NextRequest) {
  //SKIP AUTHENTICATION FOR THESE PAGES
  const pathname = request.nextUrl.pathname;
  console.log("--- go to Middleware filter: " + pathname);

  const PUBLIC_MODE = false;
  if (PUBLIC_MODE) {
    return NextResponse.next();
  }
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const skipPrefix = ["/api/auth/login", "/api/auth/register", "/", "favicon.ico"];
  if (skipPrefix.includes(pathname)) {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === "/api/users" && request.method == "POST") {
    return NextResponse.next();
  }

  // Check if the user is authenticated
  const authHeader = request.headers.get("authorization");
  const token = authHeader ? authHeader.split(" ")[1] : null;
  if (token) {
    try {
      // Verify the token
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT secret is not defined");
      }

      const jwtSecret = process.env.JWT_SECRET;
      if (!jwtSecret) {
        throw new Error("JWT secret is not defined");
      }
      const decoded = await verifyToken(token);

      // Tạo headers mới - CÁCH ĐÚNG
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("user", JSON.stringify(decoded));

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    } catch (error: any) {
      //   console.error("JWT verification failed:", error);
      return NextResponse.json({ message: error?.message }, { status: 401 });
    }
  } else {
    //REsponse with a 401 Unauthorized status
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

// const skipPrefix = [
//   "_next/static",
//   "_next/image",
//   "favicon.ico",
//   "api/auth/login",
//   "auth/login",
//   "api/auth/register",
// ];
// export const config = {
//   matcher: [`/((?!${skipPrefix.join("|")}).*)`],
// };
