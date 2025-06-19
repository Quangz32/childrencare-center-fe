import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import UserModel from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const allUsers = await UserModel.find({});
    return NextResponse.json({ users: allUsers }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET users:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect();

    const user = await request.json();
    console.log("Creating new user:", user);

    if (!user || user === "") {
      return NextResponse.json(
        { message: "request body is required" },
        { status: 400 }
      );
    }

    const newUser = new UserModel(user);
    await newUser.save();
    return NextResponse.json({ user: newUser }, { status: 200 });
  } catch (error: any) {
    console.error("Error in POST users:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
} 