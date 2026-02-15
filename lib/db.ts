import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error(
      "Environment variable MONGODB_URI is not defined. Set it in .env.local or your environment.",
    );
  }

  await mongoose.connect(uri);
};

// mongodb://localhost:27017/
