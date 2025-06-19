import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/utils/mongodb";
import MemoryModel from "@/models/Memory";
import { uploadImageFromFile, deleteImage } from "@/services/cloudinaryService";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;        
    const memory = await MemoryModel.findById(id).populate('user');

    if (!memory) {
      return NextResponse.json(
        { message: "Memory not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ memory: memory }, { status: 200 });
  } catch (error: any) {
    console.error("Error in GET memory by ID:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    
    // Lấy user từ headers
    const userHeader = request.headers.get("user");
    if (!userHeader) {
      return NextResponse.json(
        { message: "User authentication required" },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);

    // Tìm memory hiện tại
    const existingMemory = await MemoryModel.findById(id);
    if (!existingMemory) {
      return NextResponse.json(
        { message: "Memory not found" },
        { status: 404 }
      );
    }

    // Kiểm tra quyền sở hữu
    if (existingMemory.user.toString() !== user.id) {
      return NextResponse.json(
        { message: "Unauthorized to update this memory" },
        { status: 403 }
      );
    }

    // Lấy dữ liệu từ FormData
    const formData = await request.formData();
    
    const title = formData.get("title") as string;
    const content = formData.get("content") as string;
    const date = formData.get("date") as string;
    const imageFile = formData.get("image") as File;

    // Chuẩn bị data update
    const updateData: any = {};
    
    if (title) updateData.title = title.trim();
    if (content) updateData.content = content.trim();
    if (date) updateData.date = new Date(date);

    // Nếu có ảnh mới, upload và cập nhật
    if (imageFile && imageFile.size > 0) {
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

      // Upload ảnh mới lên Cloudinary
      const uploadResult = await uploadImageFromFile(
        imageFile,
        "memories",
        `memory_${user.id}_${Date.now()}`
      );

      updateData.image = uploadResult.secure_url;

      // Xóa ảnh cũ từ Cloudinary (nếu có)
      if (existingMemory.image) {
        try {
          // Extract public_id from URL (cách đơn giản)
          const urlParts = existingMemory.image.split('/');
          const publicIdWithExtension = urlParts[urlParts.length - 1];
          const publicId = publicIdWithExtension.split('.')[0];
          await deleteImage(`memories/${publicId}`);
        } catch (deleteError) {
          console.error("Error deleting old image:", deleteError);
          // Không throw error vì ảnh mới đã upload thành công
        }
      }
    }

    // Cập nhật memory
    const updatedMemory = await MemoryModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json(
      { memory: updatedMemory },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in PUT memory:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    
    // Lấy user từ headers
    const userHeader = request.headers.get("user");
    if (!userHeader) {
      return NextResponse.json(
        { message: "User authentication required" },
        { status: 401 }
      );
    }

    const user = JSON.parse(userHeader);

    // Tìm memory hiện tại
    const existingMemory = await MemoryModel.findById(id);
    if (!existingMemory) {
      return NextResponse.json(
        { message: "Memory not found" },
        { status: 404 }
      );
    }

    // Kiểm tra quyền sở hữu
    if (existingMemory.user.toString() !== user.id) {
      return NextResponse.json(
        { message: "Unauthorized to delete this memory" },
        { status: 403 }
      );
    }

    // Xóa ảnh từ Cloudinary
    if (existingMemory.image) {
      try {
        // Extract public_id from URL
        const urlParts = existingMemory.image.split('/');
        const publicIdWithExtension = urlParts[urlParts.length - 1];
        const publicId = publicIdWithExtension.split('.')[0];
        await deleteImage(`memories/${publicId}`);
      } catch (deleteError) {
        console.error("Error deleting image from Cloudinary:", deleteError);
        // Tiếp tục xóa memory từ DB dù có lỗi xóa ảnh
      }
    }

    // Xóa memory từ database
    await MemoryModel.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Memory deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in DELETE memory:", error);
    return NextResponse.json(
      { message: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}