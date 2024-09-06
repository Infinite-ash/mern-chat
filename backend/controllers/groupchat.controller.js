import Group from "../models/group.model.js";
import groupMessage from "../models/groupMessage.model.js";
import User from "../models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const addMessage = async (req, res) => {
    try {
        const { content, senderId, groupId } = req.body;
        console.log({ content, senderId, groupId });

        const group = await Group.findById(groupId);

        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        
        if (!group.groupMembers.includes(senderId)) {
            return res.status(403).json({ message: "Sender is not a member of the group" });
        }

        const sender = await User.findById(senderId);




        // Create the new message
        const newMessage = new groupMessage({
            content,
            senderId,
            groupId
        });

       
            // res.status(201).json(newMessage);
           const savedMessage =  await newMessage.save();
        
        
        

        // Add the message ID to the group's messages array
        await Group.findByIdAndUpdate(
            groupId,
            { $push: { messages: newMessage._id } },
            { new: true }
        );

        io.to(groupId).emit('newGmessage', savedMessage);

        res.status(201).json({ newMessage:newMessage , sender:sender.fullName });
    } catch (error) {
        console.error("Error adding message:", error);
        res.status(500).json({ message: "An error occurred while adding the message" });
    }
};