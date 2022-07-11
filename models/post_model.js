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
        repost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        isSaved: Boolean,
        isHidden: Boolean,
        likeUsers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        likes: {
            type: Number,
            default: 0,
        },
        commentId: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        }],
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
