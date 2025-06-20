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
    const { email, phone, password, role, fullName, gender, address } =
      await request.json();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email or phone already exists" },
        { status: 409 }
      );
    }

    const newUser = new UserModel({
      email,
      phone,
      password, // Storing plain text password
      role,
      fullName,
      gender,
      address,
    });

    await newUser.save();

    return NextResponse.json(
      { message: "User created successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error in POST user:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
} 