import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IQuestion extends Document {
  name: string;
  email: string;
  phone: string;
  topic?: string;
  question: string;
  createdAt: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  topic: { type: String },
  question: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default models.Question || model<IQuestion>('Question', QuestionSchema, 'questions'); 