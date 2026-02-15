import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: false,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// Prevent model overwrite warning and ensure schema registration
let Blog: any;
try {
  Blog = mongoose.model("Blog");
} catch (error) {
  Blog = mongoose.model("Blog", BlogSchema);
}

export default Blog;
