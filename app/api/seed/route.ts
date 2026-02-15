import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Blog from "@/app/models/Blog";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function GET() {
    try {
        await connectDB();

        // 1. Ensure a user exists to author the blogs
        let user = await User.findOne({ email: "[Email-address]" });
        if (!user) {
            const hashedPassword = await bcrypt.hash("password123", 10);
            user = await User.create({
                name: "Demo Author",
                email: "demo@example.com",
                password: hashedPassword,
                role: "admin",
            });
            console.log("Created demo user");
        }

        // 2. Define high-quality blog data
        const blogs = [
            {
                title: "The Future of Minimalist Design in 2026",
                content: "Minimalism isn't just about using less; it's about making room for more of what matters. In 2026, we're seeing a shift towards 'warm minimalism'—spaces that feel curated yet lived-in. This trend emphasizes natural materials, soft lighting, and a palette that calms the mind. Designers are moving away from sterile white boxes to embrace textures that invite touch and colors that evoke nature. It's a holistic approach that considers not just how a space looks, but how it feels to inhabit it.",
                banner: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2067&auto=format&fit=crop",
            },
            {
                title: "Exploring the Deep Ocean: New Discoveries",
                content: "The ocean remains largely unexplored, a final frontier right here on Earth. Recent expeditions have revealed bioluminescent species that challenge our understanding of life in extreme conditions. From the crushing pressures of the Mariana Trench to the thermal vents teeming with unique ecosystems, the ocean continues to surprise us. These discoveries not only expand our biological knowledge but also hold keys to medical breakthroughs and sustainable energy solutions.",
                banner: "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?q=80&w=2070&auto=format&fit=crop",
            },
            {
                title: "Mastering the Art of Coffee Brewing",
                content: "Coffee is more than a caffeine fix; it's a ritual. To truly master brewing, one must understand the variables: grind size, water temperature, and bloom time. The pour-over method, for instance, allows for precise control, extracting delicate floral and fruity notes often lost in automatic machines. Whether you prefer the boldness of a French Press or the clarity of a V60, the journey to the perfect cup is one of constant experimentation and refinement.",
                banner: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop",
            },
            {
                title: "Urban Architecture: Building for Tomorrow",
                content: "Modern cities are evolving. Sustainable architecture is no longer a luxury but a necessity. Green roofs, vertical gardens, and smart glass are becoming standard features in new skyscrapers. Architects are prioritizing human-centric designs that foster community and well-being. The integration of technology into the fabric of our buildings promises smarter, more efficient living spaces that adapt to our needs in real-time.",
                banner: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
            },
            {
                title: "The Quiet Revolution of Analog Photography",
                content: "In a digital age, film photography offers a tangible connection to the past. The limitation of 36 exposures forces patience and intention. Developing film is a magical process, watching images emerge from the chemistry. It's a slow art form that celebrates imperfection—the grain, the light leaks, the unexpected colors. For many, it's a welcome respite from the instant gratification of smartphone cameras.",
                banner: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?q=80&w=1974&auto=format&fit=crop",
            },
            {
                title: "Coding in the Age of AI",
                content: "Artificial Intelligence is transforming how we write code, but it's not replacing the developer. Instead, it's augmenting our capabilities, handling boilerplate and suggesting optimizations. The role of the programmer is shifting towards system architecture and problem-solving. Creativity and logic remain the core skills, as we learn to orchestrate these powerful new tools to build software that is more robust, scalable, and impactful than ever before.",
                banner: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
            },
            {
                title: "A Journey Through the Swiss Alps",
                content: "The Swiss Alps are a testament to nature's grandeur. towering peaks, pristine lakes, and charming villages create a landscape that feels pulled from a fairy tale. Hiking these trails offers a perspective on scale and silence that is hard to find elsewhere. Whether skiing in creation or simply breathing in the crisp mountain air, the Alps provide a profound sense of peace and reconnection with the natural world.",
                banner: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop",
            },
            {
                title: "Culinary Adventures: Street Food of Asia",
                content: "To know a culture, eat its street food. From the spicy laksa of Malaysia to the savory takoyaki of Japan, street food is the heartbeat of Asian cuisine. It's fast, affordable, and incredibly diverse. Each bite tells a story of history, migration, and local ingredients. Exploring these night markets is an assault on the senses in the best possible way—a symphony of smells, sounds, and tastes.",
                banner: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
            }
        ];

        // 3. Clear existing blogs (optional, but good for clean slate)
        await Blog.deleteMany({});
        console.log("Cleared existing blogs");

        // 4. Insert new blogs
        const blogDocs = blogs.map(blog => ({
            ...blog,
            author: user._id,
        }));

        await Blog.insertMany(blogDocs);

        return NextResponse.json({ message: "Database seeded successfully", count: blogs.length });
    } catch (error: any) {
        console.error("Seeding Error:", error);
        return NextResponse.json({ message: "Seeding Failed", error: error.message }, { status: 500 });
    }
}
