const jwt = require('jsonwebtoken');

// From .env.local
const JWT_SECRET = "priyanshi";
// Need a valid user ID. I'll pick one from the previous logs or just try to find one.
// Actually, without a valid user ID that exists in the DB, the API might fail with "User not found" or similar if it checks existence.
// But the token verification just decodes it. The API uses `decoded.id` to set `author`. 
// If the user doesn't exist, `Blog.create` might fail if there is a foreign key constraint (ref: "User"). 
// Wait, `author: { type: mongoose.Schema.Types.ObjectId, ref: "User" }` is just a ref. Mongoose doesn't strictly enforce FK existence on create unless we use population or hooks.
// But wait, the `User` model wasn't registered before. Now it is.
// Let's try to find a user first.

async function test() {
    try {
        // 1. Get all blogs to find a valid author ID
        const resBlogs = await fetch('http://localhost:3000/api/blogs');
        const blogs = await resBlogs.json();
        let userId = null;
        if (blogs.length > 0 && blogs[0].author) {
            userId = blogs[0].author._id || blogs[0].author;
            console.log("Found existing user ID:", userId);
        } else {
            console.log("No existing blogs/users found. Cannot create a token without a valid User ID (technically I can, but it might fail DB checks).");
            // Let's try to register a user if needed, or just fake an ID if I can't find one.
            // A random ObjectId:
            if (!userId) {
                // Generate a fake ObjectID (24 hex chars)
                userId = "698d577e9413a5261a2907f3"; // From user's previous log!
                console.log("Using user ID from previous logs:", userId);
            }
        }

        // 2. Create Token
        const token = jwt.sign({ id: userId, email: "test@example.com", role: "user" }, JWT_SECRET, { expiresIn: "1h" });
        console.log("Generated Token.");

        // 3. Post Blog
        const payload = {
            title: "Test Blog with Banner",
            content: "Testing banner upload...",
            banner: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        };

        const resPost = await fetch('http://localhost:3000/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `token=${token}`
            },
            body: JSON.stringify(payload)
        });

        console.log("POST Status:", resPost.status);
        const text = await resPost.text();
        console.log("POST Response Body START");
        console.log(text);
        console.log("POST Response Body END");

    } catch (e) {
        console.error(e);
    }
}

test();
