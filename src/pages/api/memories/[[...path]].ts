import UserModel from "@/models/User";
import MemoryModel from "@/models/Memory";
import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";

//Xử lí Route : /api/memories
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    dbConnect();
    const { path } = req.query;

    if (path === undefined) {
      if (req.method === "GET") return GET(req, res);
      if (req.method === "POST") return POST(req, res);
    } else {
      throw new Error("This request shouldn't be here");
    }
  } catch (error) {
    // console.error("error", error);
    res.status(500).json(error || "Internal server error");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = JSON.parse(req.headers.user as string);
    console.log(user);
    const allMemories = await MemoryModel.find({ user: user.id });
    res.status(200).json({ allMemories: allMemories });
  } catch (error) {
    res.status(500).json((error as any).message);
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const memory = req.body;
    if (!memory || memory === "") {
      return res.status(400).json({ message: "request body is required" });
    }
    const newMemory = new MemoryModel(memory);
    // newMemory.date = thi
    await newMemory.save();
    res.status(200).json({ memory: newMemory });
    console.log;
  } catch (error: any) {
    console.error("Error in POST:", error);
    res.status(500).json({ message: error.message || "Internal server error" });
  }
}
