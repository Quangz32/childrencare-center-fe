import UserModel from "@/models/User";
import dbConnect from "@/utils/mongodb";
import * as jose from "jose";
import { createToken } from "../utils/jwtUtils";
import { ObjectId } from "mongoose";

//username <=> email
export async function login(username: string, password: string): Promise<any> {
  dbConnect();
  const users = UserModel;
  const existingUser = await users.findOne({ email: username });
  console.log("--authService  , existingUser: ", existingUser);
  if (!existingUser) {
    throw new Error("User not found");
  }

  if (username === existingUser.email && password === existingUser.password) {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT secret is not defined");
    }
    const key = new TextEncoder().encode(jwtSecret);

    const payload = {
      //   email: existingUser.email,
      id: existingUser._id.toString(),
      role: existingUser.role,
    };

    const accessToken = await createToken(payload, "1d");
    const refreshToken = await createToken(payload, "7d");

    return {
      accessToken,
      refreshToken,
      user: existingUser,
    };
  } else {
    throw new Error("Invalid credentials");
  }
}
