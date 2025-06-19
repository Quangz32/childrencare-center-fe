import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import MemoryModel from "@/models/Memory";
import { uploadImageFromFile } from "@/services/cloudinaryService";

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    // Lấy user từ headers (giả sử được set bởi middleware)
    const userHeader = request.headers.get("user");
    if (!userHeader) {
      return NextResponse.json(
        { message: "User authentication required" },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);
    console.log("Getting memories for user:", user);

    const allMemories = await MemoryModel.find({ user: user.id });
    return NextResponse.json({ allMemories: allMemories }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET memories:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
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

    // Lấy dữ liệu từ FormData
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;
    const imageFile = formData.get("image") as File;

    // Kiểm tra dữ liệu bắt buộc
    if (!title || !content || !date || !imageFile) {
      return NextResponse.json(
        { message: "Title, content, date, and image are required" },
        { status: 400 }
      );
    }

    // Kiểm tra loại file
    if (!imageFile.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "File must be an image" },
        { status: 400 }
      );
    }

    // Kiểm tra kích thước file (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (imageFile.size > maxSize) {
      return NextResponse.json(
        { message: "File size too large (max 10MB)" },
        { status: 400 }
      );
    }

    // Upload ảnh lên Cloudinary
    const uploadResult = await uploadImageFromFile(
      imageFile,
      "memories", // folder name
      `memory_${user.id}_${Date.now()}` // custom public_id
    );

    // Tạo memory object
    const memoryData = {
      user: user.id,
      title,
      content,
      date: new Date(date),
      image: uploadResult.secure_url,
    };

    const newMemory = new MemoryModel(memoryData);
    await newMemory.save();

    return NextResponse.json(
      { 
        memory: newMemory,
        imageData: {
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id
        }
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error in POST memory:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}