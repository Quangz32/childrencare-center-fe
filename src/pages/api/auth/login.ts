import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "@/utils/mongodb";
import { login } from "@/service/authService";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log("Connecting to database...");
    dbConnect();

    if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const result = await login(email, password);
    res.status(200).json(result);
  } catch (error: any) {
    console.error("---- error -----", error);
    res.status(400).json(error.message || "Internal server error x");
  }
}
