import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/app/models/Comment";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import "@/app/models/User"; // Ensure User model is registered

// GET: Fetch comments for a blog
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const blogId = searchParams.get("blogId");

        if (!blogId) {
            return NextResponse.json({ error: "Blog ID is required" }, { status: 400 });
        }

        await connectDB();

        // Fetch comments and populate author details
        const comments = await Comment.find({ blogId })
            .populate("author", "name")
            .sort({ createdAt: -1 }); // Newest first

        return NextResponse.json(comments);
    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

// POST: Create a comment
export async function POST(req: Request) {
    try {
        const token = (await cookies()).get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded: any = verifyToken(token);
        const { content, blogId, parentId } = await req.json();

        if (!content || !blogId) {
            return NextResponse.json({ error: "Content and Blog ID required" }, { status: 400 });
        }

        await connectDB();

        const newComment = await Comment.create({
            content,
            blogId,
            author: decoded.id,
            parentId: parentId || null
        });

        const populatedComment = await newComment.populate("author", "name");

        return NextResponse.json(populatedComment, { status: 201 });

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
