import dbConnect from "@/utils/mongodb";
import UserModel from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

import type { NextRequest } from "next/server";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("Connecting to database...");
    dbConnect();

    if (req.method === "GET") return GET(req, res);
    if (req.method === "PUT") return PUT(req, res);
  } catch (error) {
    console.error("error", error);
    res.status(500).json(error || "Internal server error");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.id as string;
    const users = UserModel;
    const user = await users.findById(userId);
    res.status(200).json({ users: user });
  } catch (error: any) {
    console.error("Error in POST:", error);
    res.status(500).json(error.message || "Internal server error");
  }
}

async function PUT(req: NextApiRequest, res: NextApiResponse) {
  try {
    const userId = req.query.id as string;
    const { fullName, gender, address } = req.body;
    if (!fullName && !gender && !address) {
      return res.status(400).json({ message: "No fields to update" });
    }

    const users = UserModel;
    const updatedUser = await users.findByIdAndUpdate(
      userId,
      { fullName, gender, address },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error: any) {
    console.error("Error in POST:", error);
    res.status(500).json(error.message || "Internal server error");
  }
}
