import { JWTPayload, jwtVerify, SignJWT } from "jose";

// import { TextEncoder } from "util";

const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function createToken(payload: JWTPayload, exp: string) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" }) // Using HMAC SHA-256
    .setExpirationTime(exp) // Token expires in 1 day
    .sign(key);
  return token;
}

export async function verifyToken(token: string) {
  //   try {
  const { payload } = await jwtVerify(token, key);
  return payload;
  //   } catch (error) {
  //     console.error("Token verification failed:", error);
  //     return null;
  //   }
}
