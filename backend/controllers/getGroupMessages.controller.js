import Group from "../models/group.model.js";
import { io } from "../socket/socket.js";

export const getGroupMessages = async (req, res) => {
    try {
        const { groupId } = req.params;
        // Validate that groupId is provided
        if (!groupId) {
            return res.status(400).json({ message: "Group ID is required" });
        }

        // Find the group by ID and populate messages
        const group = await Group.findById(groupId).populate({
            path: 'messages',
            populate: {
                path: 'senderId',
                select: 'name'  
            }
        });

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }
        // console.log("messages", group.messages);
        // Send the messages as a response
        io.to(groupId).emit('newGmessage', {newMessage:group.messages});

        return res.status(200).json({ messages: group.messages });
    } catch (error) {
        console.error("Error retrieving group messages:", error);
        return res.status(500).json({ message: "An error occurred while retrieving group messages" });
    }
};
