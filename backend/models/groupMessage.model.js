import mongoose from "mongoose";

const GmessageSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
            default: ""  // Default value for message content
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

const groupMessage = mongoose.model("groupMessage", GmessageSchema);

export default groupMessage;
