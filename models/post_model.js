import mongoose  from "mongoose";
import Comment from "./comment_model.js"

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
            // required: true,
            trim: true,
        },
        repost: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
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
        isSaved: Boolean,
        isHidden: Boolean,
        hasHashtag: Boolean,
        hasMention: Boolean,
    },
    {
        timestamps: true,
    }
);

postSchema.post('findOneAndDelete', async function (doc){
    if(doc){
        const res = await Comment.deleteMany({_id: { $in: doc.commentId }})
        console.log(res)
    }
})

export default  mongoose.model("Post", postSchema);