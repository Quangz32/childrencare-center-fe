import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import { login } from "@/service/authService";

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const result = await login(email, password);
    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("---- error -----", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 400 }
    );
  }
}