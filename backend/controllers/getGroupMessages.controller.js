import Group from "../models/group.model.js";
import User from "../models/user.model.js";
import { io } from "../socket/socket.js";







export const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        if (!groupId) {
            return res.status(400).json({ message: "Group ID is required" });
        }

        const group = await Group.findById(groupId).populate({
            path: 'messages',
            populate: {
                path: 'senderId',
                select: 'fullName'  // Make sure to include the '_id' field if it's not included by default
            }
        });

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Transform the messages to include the sender's full name and senderId
        const messagesWithSenders = group.messages.map(message => ({
            _id: message._id,
            content: message.content,
            createdAt: message.createdAt,
            updatedAt: message.updatedAt,
            senderId: message.senderId._id, // Include only the ID of the sender
            sender: message.senderId.fullName // Include the full name of the sender
        }));

        // Emit the enriched messages to the group
        //  io.to(groupId).emit('newGmessage', messagesWithSenders);

        return res.status(200).json({ messages: messagesWithSenders });
    } catch (error) {
        console.error("Error retrieving group messages:", error);
        return res.status(500).json({ message: "An error occurred while retrieving group messages" });
    }
};