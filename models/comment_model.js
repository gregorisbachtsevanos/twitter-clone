import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
        },
        body: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true
    }
);

export default  mongoose.model("Comment", commentSchema);
