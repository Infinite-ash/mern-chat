import mongoose from "mongoose";

const groupSchema = new mongoose.Schema(
	{
		groupName: {
			type: String,
			required: true,
			unique: true
		},
		groupMembers: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }],
        messages: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "groupMessage",  
        }]
	},
	{ 
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

// groupSchema.path('messages').default([]); 

const Group = mongoose.model("Group", groupSchema);

export default Group;
