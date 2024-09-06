import React, { useState } from 'react';
import useGetConversations from '../../hooks/useGetConversations';
import { useAuthContext } from '../../context/AuthContext';
// import  useCreateGroup  from '../../hooks/useCreateGroup'; // Ensure this is the correct import

const UserSelector = () => {
    const { loading, conversations } = useGetConversations();
    const [selectedUsers, setSelectedUsers] = useState(new Set());
    const [groupName, setGroupName] = useState('');
    // const { createGroup } = useCreateGroup(); 
    const {setCreateGroup} = useAuthContext();

    const handleSelectUser = (userId) => {
        setSelectedUsers((prevSelected) => {
            const newSelected = new Set(prevSelected);
            if (newSelected.has(userId)) {
                newSelected.delete(userId);
            } else {
                newSelected.add(userId);
            }
            return newSelected;
        });
    };

    const handleAddGroup = async () => {
        if (!groupName.trim()) {
            alert('Please enter a group name');
            return;
        }

        if (selectedUsers.size === 0) {
            alert('Please select at least one user');
            return;
        }

        try {
            await createGroup({ groupName, groupMembers: Array.from(selectedUsers) });
            setSelectedUsers(new Set());
            setCreateGroup(prev=>!prev);
            setGroupName('');
        } catch (error) {
            console.error('Error creating group:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!conversations || conversations.length === 0) {
        return <div>No users found.</div>;
    }

    return (
        <div className="p-4 max-w-md mx-auto bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Create a Group</h2>
            
            <div className="mb-4">
                <label htmlFor="groupName" className="block text-lg font-medium mb-2">Group Name</label>
                <input
                    type="text"
                    id="groupName"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Select Users</h3>
                <div className="space-y-2">
                    {conversations.map((user) => (
                        !user?.groupName && <div key={user._id} className="flex items-center">
                        <input
                            type="checkbox"
                            id={`user-${user._id}`}
                            checked={selectedUsers.has(user._id)}
                            onChange={() => handleSelectUser(user._id)}
                            className="mr-2"
                        />
                        <label htmlFor={`user-${user._id}`} className="text-lg">{user.fullName}</label>
                    </div>
                    ))}
                </div>
            </div>

           <div className="flex gap-5">
           <button
                onClick={handleAddGroup}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                Create Group
            </button>
            <button
                onClick={()=> setCreateGroup(prev=>!prev)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
                cancel
            </button>
           </div>
        
        </div>
    );
};

export default UserSelector;


const createGroup = async ({groupMembers, groupName}) => {
    // setLoading(true);
    try {
        const res = await fetch("/api/groups/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ groupName, groupMembers }),
        });
        const data = await res.json();
        // if (data.error) {
        //     throw new Error(data.error);
        // }
        console.log(data);
        // setConversations(data);
    } catch (error) {
        toast.error(error.message);
    } finally {
    }
};

// creatGroup();
