import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Comment from "@/app/models/Comment";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const token = (await cookies()).get("token")?.value;
        if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const decoded: any = verifyToken(token);
        const userId = decoded.id;

        await connectDB();

        const comment = await Comment.findById(id);
        if (!comment) return NextResponse.json({ error: "Comment not found" }, { status: 404 });

        // Toggle Like
        const likeIndex = comment.likes.indexOf(userId);
        if (likeIndex === -1) {
            comment.likes.push(userId);
        } else {
            comment.likes.splice(likeIndex, 1);
        }

        await comment.save();

        return NextResponse.json(comment.likes);

    } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
