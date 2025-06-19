import { NextRequest } from 'next/server';
import { handleImageUpload } from '@/services/cloudinaryService';

export async function POST(request: NextRequest) {
  return handleImageUpload(request, 'children-care');
} 