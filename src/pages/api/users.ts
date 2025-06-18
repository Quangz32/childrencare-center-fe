import dbConnect from "@/utils/mongodb";
import UserModel from "@/models/User";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log("Connecting to database...");
    dbConnect();

    console.log("-- users.ts");
    if (req.method === "GET") return GET(req, res);
    if (req.method === "POST") return POST(req, res);
  } catch (error) {
    console.error("error", error);
    res.status(500).json(error || "Internal server error");
  }
}

async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = UserModel;
    const allUsers = await users.find({});
    res.status(200).json({ users: allUsers });
  } catch (error: any) {
    console.error("Error in POST:", error);
    res.status(500).json(error.message || "Internal server error");
  }
}

async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const users = UserModel;
    const user = req.body;
    console.log("Creating new user:", user);

    if (!user || user === "") {
      return res.status(400).json({ message: "request body is required" });
    }

    const newUser = new users(user);
    await newUser.save();
    res.status(200).json({ user: user });
  } catch (error: any) {
    console.error("Error in POST:", error);
    res.status(500).json(error.message || "Internal server error");
  }
}