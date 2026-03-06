import jwt from "jsonwebtoken";

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "Environment variable JWT_SECRET is not defined. Set JWT_SECRET in your .env.local or environment.",
    );
  }
  return secret;
};

export const signToken = (payload: any) => {
  return jwt.sign(payload, getJwtSecret(), { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, getJwtSecret());
};
