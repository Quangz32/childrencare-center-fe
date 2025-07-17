import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import Question from '@/models/Question';

const MONGODB_URI = process.env.MONGODB_URI as string;

async function connectMongoose() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, topic, question } = body;
    if (!name || !email || !phone || !question) {
      return NextResponse.json({ message: 'Thiếu thông tin bắt buộc.' }, { status: 400 });
    }
    await connectMongoose();
    const newQuestion = new Question({
      name,
      email,
      phone,
      topic,
      question,
      createdAt: new Date()
    });
    await newQuestion.save();
    return NextResponse.json({ message: 'Gửi thành công!', id: newQuestion._id }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Có lỗi xảy ra.' }, { status: 400 });
  }
} 