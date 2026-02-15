import mongoose, { Schema, Document, Model } from "mongoose";

export interface IComment extends Document {
    content: string;
    author: mongoose.Types.ObjectId;
    blogId: mongoose.Types.ObjectId;
    parentId?: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
    {
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true },
        blogId: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
        parentId: { type: Schema.Types.ObjectId, ref: "Comment", default: null },
        likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

let Comment: Model<IComment>;
try {
    Comment = mongoose.model<IComment>("Comment");
} catch (error) {
    Comment = mongoose.model<IComment>("Comment", CommentSchema);
}

export default Comment;
