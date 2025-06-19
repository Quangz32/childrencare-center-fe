import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import MemoryModel from "@/models/Memory";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Lấy user từ headers
    const userHeader = request.headers.get("user");
    if (!userHeader) {
      return NextResponse.json(
        { message: "User authentication required" },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);

    // Lấy query parameters
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const sortBy = searchParams.get("sortBy") || "date";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    // Tính skip
    const skip = (page - 1) * limit;

    // Tạo sort object
    const sort: any = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;

    // Lấy memories với phân trang
    const memories = await MemoryModel.find({ user: user.id })
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Đếm tổng số memories
    const totalCount = await MemoryModel.countDocuments({ user: user.id });
    const totalPages = Math.ceil(totalCount / limit);

    return NextResponse.json({
      memories,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET user memories:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
} 