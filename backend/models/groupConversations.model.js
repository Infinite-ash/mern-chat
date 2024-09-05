import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema(
    {
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User', // Reference to the User model
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        timestamp: {
            type: Date,
            default: Date.now,
        },
    },
    { _id: false } // Disable _id for individual messages if not needed
);

const groupConversationSchema = new mongoose.Schema(
    {
        group: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group', // Reference to the Group model
            required: true,
        },
        messages: [GmessageSchema], // Array of messages
    },
    { timestamps: true }
);

const GroupConversation = mongoose.model('GroupConversation', groupConversationSchema);

export default GroupConversation;
