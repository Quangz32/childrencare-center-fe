import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import UserModel from "@/models/User";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { message: "Mật khẩu hiện tại và mật khẩu mới là bắt buộc" },
        { status: 400 }
      );
    }

    const user = await UserModel.findById(id);

    if (!user) {
      return NextResponse.json({ message: "Không tìm thấy người dùng" }, { status: 404 });
    }

    const isMatch = currentPassword === user.password;

    if (!isMatch) {
      return NextResponse.json({ message: "Mật khẩu hiện tại không đúng" }, { status: 400 });
    }

    user.password = newPassword;
    await user.save();

    return NextResponse.json(
      { message: "Cập nhật mật khẩu thành công" },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Lỗi khi cập nhật mật khẩu:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Lỗi máy chủ nội bộ";
    return NextResponse.json(
      { message: errorMessage },
      { status: 500 }
    );
  }
} 