import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/app/models/Blog";
import "@/app/models/User"; // Ensure User model is registered
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

// GET - Get all blogs
export async function GET() {
  try {
    await connectDB();

    const blogs = await Blog.find()
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(blogs);
  } catch (error: any) {
    console.error("GET /api/blogs Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}

// POST - Create new blog
export async function POST(req: Request) {
  try {
    await connectDB();

    const token = (await cookies()).get("token")?.value;
    console.log("Token:", token);

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);

    const { title, content, banner } = await req.json();

    if (!title || !content) {
      return NextResponse.json(
        { message: "Title and content required" },
        { status: 400 },
      );
    }

    const blog = await Blog.create({
      title,
      content,
      banner,
      author: decoded.id,
    });

    return NextResponse.json(blog, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/blogs:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
  return new Response("working");
}
