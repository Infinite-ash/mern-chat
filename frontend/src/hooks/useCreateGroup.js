import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useCreateGroup = async ({groupMembers, groupName}) => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    const {setCreateGroup} = useAuthContext();
    // console.log({groupMembers, groupName});
    useEffect(() => {
        const creatGroup = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/groups/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ groupName, groupMembers }),
                });
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setCreateGroup(prev=>!prev);
                console.log(data);
                setConversations(prev => [...prev,data]);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        creatGroup();
    }, []);

    return { loading, conversations };
};
export default useCreateGroup;