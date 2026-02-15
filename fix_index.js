const mongoose = require('mongoose');

async function fix() {
    try {
        // Connect to the default 'test' database as per .env.local
        await mongoose.connect('mongodb://localhost:27017/test');

        const collection = mongoose.connection.collection("blogs");

        // List indexes
        const indexes = await collection.indexes();
        console.log("Current indexes on 'blogs':", indexes);

        // Drop the problematic index
        const indexName = "email_1";
        const emailIndex = indexes.find(idx => idx.name === indexName);

        if (emailIndex) {
            await collection.dropIndex(indexName);
            console.log(`Successfully dropped index '${indexName}' from 'blogs' collection.`);
        } else {
            console.log(`Index '${indexName}' not found on 'blogs' collection.`);
        }

    } catch (error) {
        console.error("Error:", error);
    } finally {
        await mongoose.disconnect();
    }
}

fix();
