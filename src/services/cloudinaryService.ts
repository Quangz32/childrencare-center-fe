'use server';

import { NextRequest, NextResponse } from 'next/server';

export interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: string;
  bytes: number;
}

// Lazy load cloudinary để tránh lỗi import
async function getCloudinary() {
  const { v2: cloudinary } = await import('cloudinary');
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  
  return cloudinary;
}

/**
 * Upload ảnh lên Cloudinary từ base64 string
 * @param base64String - Base64 string của ảnh
 * @param folder - Thư mục lưu trữ trên Cloudinary (optional)
 * @param publicId - Public ID tùy chỉnh (optional)
 * @returns Promise<CloudinaryUploadResult>
 */
export async function uploadImageFromBase64(
  base64String: string,
  folder?: string,
  publicId?: string
): Promise<CloudinaryUploadResult> {
  try {
    const cloudinary = await getCloudinary();
    
    const uploadOptions: any = {
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
    };

    if (folder) {
      uploadOptions.folder = folder;
    }

    if (publicId) {
      uploadOptions.public_id = publicId;
    }

    const result = await cloudinary.uploader.upload(base64String, uploadOptions);
    
    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      width: result.width,
      height: result.height,
      format: result.format,
      resource_type: result.resource_type,
      created_at: result.created_at,
      bytes: result.bytes,
    };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
}

/**
 * Upload ảnh lên Cloudinary từ File object
 * @param file - File object từ form upload
 * @param folder - Thư mục lưu trữ trên Cloudinary (optional)
 * @param publicId - Public ID tùy chỉnh (optional)
 * @returns Promise<CloudinaryUploadResult>
 */
export async function uploadImageFromFile(
  file: File,
  folder?: string,
  publicId?: string
): Promise<CloudinaryUploadResult> {
  try {
    // Chuyển đổi File thành base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64String = `data:${file.type};base64,${buffer.toString('base64')}`;

    return await uploadImageFromBase64(base64String, folder, publicId);
  } catch (error) {
    console.error('File to Cloudinary upload error:', error);
    throw new Error('Failed to upload file to Cloudinary');
  }
}

/**
 * Xóa ảnh từ Cloudinary
 * @param publicId - Public ID của ảnh cần xóa
 * @returns Promise<boolean>
 */
export async function deleteImage(publicId: string): Promise<boolean> {
  try {
    const cloudinary = await getCloudinary();
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    return false;
  }
}

/**
 * Tạo URL với transformation cho ảnh
 * @param publicId - Public ID của ảnh
 * @param transformations - Các transformation (width, height, crop, etc.)
 * @returns string - URL đã được transform
 */
export async function getTransformedImageUrl(
  publicId: string,
  transformations?: {
    width?: number;
    height?: number;
    crop?: string;
    quality?: string | number;
    format?: string;
  }
): Promise<string> {
  const cloudinary = await getCloudinary();
  
  if (!transformations) {
    return cloudinary.url(publicId);
  }

  return cloudinary.url(publicId, {
    width: transformations.width,
    height: transformations.height,
    crop: transformations.crop || 'fill',
    quality: transformations.quality || 'auto',
    format: transformations.format || 'auto',
  });
}

/**
 * Middleware function để xử lý upload trong API route
 * @param request - NextRequest object
 * @param folder - Thư mục lưu trữ
 * @returns Promise<NextResponse>
 */
export async function handleImageUpload(
  request: NextRequest,
  folder?: string
): Promise<NextResponse> {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Kiểm tra loại file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    // Kiểm tra kích thước file (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large (max 10MB)' },
        { status: 400 }
      );
    }

    const result = await uploadImageFromFile(file, folder);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('Upload handler error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 