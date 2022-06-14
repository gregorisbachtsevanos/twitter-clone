const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        image: {
            type: String,
            trim: true,
        },
        post: {
            type: String,
            required: true,
            trim: true,
        },
        likes:Number,
        comments:Number,
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);