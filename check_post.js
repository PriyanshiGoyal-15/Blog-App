// Native fetch in Node 18+
async function testPost() {
    const token = "mock_token"; // We might need a real token, but let's see if we get 401 or 500 first.
    // Actually, we need to login to get a token first. 
    // Let's try to just hit the endpoint and see if it crashes or returns 401.

    const payload = {
        title: "Test Blog",
        content: "Content",
        banner: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
    };

    try {
        const res = await fetch('http://localhost:3000/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // 'Cookie': 'token=...' // identifying that we need a token
            },
            body: JSON.stringify(payload)
        });
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Response:", text);
    } catch (e) {
        console.error(e);
    }
}

testPost();
