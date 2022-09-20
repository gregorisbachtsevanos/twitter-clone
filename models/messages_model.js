import mongoose from 'mongoose';

const messagesSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            'ref': "User"
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            'ref': "User"
        },
        chatId: {
            type: mongoose.Schema.Types.ObjectId,
            'ref': "Chat"
        },
        message: {
            type: String,
            trim: true
        },
    },
    {
        timestamps: true
    }
)

export default mongoose.model("Message", messagesSchema)