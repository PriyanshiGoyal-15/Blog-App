import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";

export async function GET() {
    try {
        const token = (await cookies()).get("token")?.value;

        if (!token) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const decoded: any = verifyToken(token);

        // Fetch user from DB to ensure we get the name even if not in token
        const User = await import("@/app/models/User").then(mod => mod.default);
        const { connectDB } = await import("@/lib/db");
        await connectDB();

        const user = await User.findById(decoded.id).select("name email role");

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            id: user._id,
            role: user.role,
            name: user.name,
        });
    } catch (error) {
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}
