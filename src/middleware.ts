import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "./utils/jwtUtils";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  console.log("--- Middleware filter: " + pathname);

  // Development mode - Skip authentication entirely
  const PUBLIC_MODE = process.env.NODE_ENV === 'development' && process.env.SKIP_AUTH === 'true';
  if (PUBLIC_MODE) {
    console.log("--- Public mode enabled, skipping auth");
    return NextResponse.next();
  }

  // Skip middleware for non-API routes
  if (!pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Public API routes that don't require authentication
  const publicRoutes = [
    "/api/auth/login",
    "/api/auth/register", 
    "/api/hello",
    "/api/upload", // Allow uploads for now, can be restricted later
    "/api/questions" // Allow questions for now, can be restricted later
  ];

  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Allow POST requests to /api/users (for registration)
  if (pathname === "/api/users" && request.method === "POST") {
    return NextResponse.next();
  }

  // Check for authentication token
  const authHeader = request.headers.get("authorization");
  const token = authHeader ? authHeader.split(" ")[1] : null;

  if (!token) {
    return NextResponse.json(
      { 
        error: "Unauthorized", 
        message: "Access token is required" 
      }, 
      { status: 401 }
    );
  }

  try {
    // Verify the JWT token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error("JWT_SECRET is not defined in environment variables");
      return NextResponse.json(
        { 
          error: "Server configuration error", 
          message: "Authentication service is not properly configured" 
        }, 
        { status: 500 }
      );
    }

    const decoded = await verifyToken(token);

    // Create new headers with user info
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("user", JSON.stringify(decoded));

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error: any) {
    console.error("JWT verification failed:", error);
    
    // Return different error messages based on the error type
    let errorMessage = "Invalid or expired token";
    let statusCode = 401;

    if (error.name === 'TokenExpiredError') {
      errorMessage = "Token has expired";
    } else if (error.name === 'JsonWebTokenError') {
      errorMessage = "Invalid token format";
    } else if (error.name === 'NotBeforeError') {
      errorMessage = "Token not active yet";
    }

    return NextResponse.json(
      { 
        error: "Authentication failed", 
        message: errorMessage,
        code: error.name || 'UNKNOWN_ERROR'
      }, 
      { status: statusCode }
    );
  }
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Match all API routes except for static files
    '/api/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
