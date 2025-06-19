import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import UserModel from "@/models/User";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const userId = params.id;
    const user = await UserModel.findById(userId);
    
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ user: user }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET user by ID:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    
    const userId = params.id;
    const { fullName, gender, address } = await request.json();
    
    if (!fullName && !gender && !address) {
      return NextResponse.json(
        { message: "No fields to update" },
        { status: 400 }
      );
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { fullName, gender, address },
      { new: true }
    );

    if (!updatedUser) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error: any) {
    console.error("Error in PUT user:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
} 