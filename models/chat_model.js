import mongoose from "mongoose";
const { Schema } = mongoose

const chatSchema = new Schema({
    chatName: {
        type: String,
        trim: true
    },
    isGroup: {
        type: Boolean,
        default: false
    },
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    latestMessage: {
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }
}, { timestamps: true })

export default models('Chat', chatSchema)