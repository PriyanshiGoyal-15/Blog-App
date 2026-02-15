import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/app/models/Blog";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

// GET - Get single blog
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();
    const blog = await Blog.findById(id).populate("author", "name email");
    if (!blog) return NextResponse.json({ message: "Not Found" }, { status: 404 });
    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}

// DELETE blog
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();

    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const decoded: any = verifyToken(token);

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    if (blog.author.toString() !== decoded.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    await blog.deleteOne();

    return NextResponse.json({
      message: "Deleted successfully",
    });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}


export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await connectDB();

    const token = (await cookies()).get("token")?.value;
    if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    const decoded: any = verifyToken(token);

    const { title, content, banner } = await req.json();

    const blog = await Blog.findById(id);
    if (!blog) return NextResponse.json({ message: "Not Found" }, { status: 404 });

    if (blog.author.toString() !== decoded.id) {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, banner },
      { new: true },
    );

    return NextResponse.json(updatedBlog);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}
