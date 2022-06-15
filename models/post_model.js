const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
        onwer: {
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
        likeUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        likes: {
            type: Number,
            default: 0,
        },
        color: {
            type: String,
            trim: true,
        },
        comments: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Post", postSchema);
