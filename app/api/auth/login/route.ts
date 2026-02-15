import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import { connectDB } from "@/lib/db";
import { signToken } from "@/lib/auth";
import { error } from "console";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { email, password } = body || {};

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 },
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid password" },
        { status: 401 },
      );
    }

    const token = signToken({
      id: user.id,
      role: user.role,
    });

    const response = NextResponse.json({
      message: "Login Successful",
      role: user.role,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      // sameSite: 'lax',
    });

    return response;
  } catch (err) {
    console.error("/api/auth/login error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
