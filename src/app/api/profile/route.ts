import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/utils/mongodb";
import UserModel from "@/models/User";

interface JwtPayload {
  id: string;
}

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { message: "Không tìm thấy token xác thực." },
        { status: 401 }
      );
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-default-secret"
    ) as JwtPayload;

    if (!decoded) {
      return NextResponse.json({ message: "Token không hợp lệ." }, { status: 401 });
    }

    await dbConnect();
    const user = await UserModel.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json({ message: "Không tìm thấy người dùng." }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error: unknown) {
    console.error("Lỗi khi lấy thông tin cá nhân:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Token không hợp lệ hoặc đã hết hạn." }, { status: 401 });
    }
    const errorMessage =
      error instanceof Error ? error.message : "Lỗi máy chủ nội bộ.";
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
} 