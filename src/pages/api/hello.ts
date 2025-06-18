import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // console.log("Connecting to database...");
    // dbConnect();

    return res.end("hello");
  } catch (error) {
    console.error("error", error);
    res.status(500).json(error || "Internal server error");
  }
}
