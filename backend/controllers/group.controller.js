import Group from "../models/group.model.js";

export const createGroup = async (req, res) => {
    try {
        const { groupMembers, groupName } = req.body;
        const group = await Group.findOne({ groupName });
        if (group) {
            return res.status(400).json({ message: "Already a group exists with the same name" });
        } else {
            const newGrp = new Group({
                groupName,
                groupMembers
            });
            console.log(newGrp);
            await newGrp.save();
            // io.emit('groupCreated', newGrp);
            return res.status(201).json({ group: newGrp, message: "Group created successfully" });
        }
    } catch (error) {
        console.error("Error in groupController:", error);
        return res.status(500).json({ message: "An error occurred while creating the group", error: error.message });
    }
};






export const getGroupMembers = async (req, res) => {
    try {
        const { groupId } = req.params;

        // Validate that groupId is provided
        if (!groupId) {
            return res.status(400).json({ message: "Group ID is required" });
        }

        // Find the group by ID and populate the groupMembers field
        const group = await Group.findById(groupId)
            .populate({
                path: 'groupMembers',
                select: 'name',  // Select only the name field to include in the response
            });
        
            console.log(group);
        if (!group) {
            return res.status(404).json({ message: "Group not found" });
        }

        // Format the response to include both ID and name
        const members = group.groupMembers.map(member => ({
            id: member._id,
            name: member.name
        }));

        // Send the formatted members list as a response
        return res.status(200).json({ members });
    } catch (error) {
        console.error("Error retrieving group members:", error);
        return res.status(500).json({ message: "An error occurred while retrieving group members" });
    }
};



export const getGroups = async (req, res) => {
    try {
        // Extract user ID from request, for example from user session or token
        const userId = req.user.id; // Assuming you have middleware that populates req.user
        // Find all groups where the user is listed as a member
        const groups = await Group.find({ groupMembers: userId });
        // console.log("groups",groups)
        return res.status(200).json(groups);
    } catch (error) {
        console.error("Error in getUserGroups controller:", error);
        return res.status(500).json({ message: "An error occurred while retrieving user's groups", error: error.message });
    }
};

