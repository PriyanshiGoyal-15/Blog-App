// Native fetch is available in Node 18+

async function check() {
    try {
        const res = await fetch('http://localhost:3000/api/blogs');
        console.log("Status:", res.status);
        const text = await res.text();
        console.log("Raw Response:", text.substring(0, 500)); // First 500 chars
        try {
            const blogs = JSON.parse(text);
            if (Array.isArray(blogs)) {
                console.log(`Found ${blogs.length} blogs.`);
                blogs.forEach(b => {
                    console.log(`Title: ${b.title}, Banner Length: ${b.banner ? b.banner.length : 0}`);
                    if (b.banner) console.log(`Banner Start: ${b.banner.substring(0, 30)}...`);
                });
            } else {
                console.log("Response is not an array:", blogs);
            }
        } catch (e) {
            console.log("Failed to parse JSON");
        }
    } catch (e) {
        console.error(e);
    }
}

check();
