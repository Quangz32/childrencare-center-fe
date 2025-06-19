import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    return new NextResponse("hello", { status: 200 });
  } catch (error) {
    console.error("error", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 