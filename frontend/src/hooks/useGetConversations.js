import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);
    // const userId = localStorage.getItem("chat-user").userId;



    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);
            try {
                const res = await fetch("/api/users");
                const response = await fetch(`/api/groups/allgroups`,{
                    method:"POST",
                    headers: { "Content-Type": "application/json" },
                    credentials:'include',
                });

                const data = await res.json();
                const groupdata = await response.json();
                console.log("groupdata",groupdata)

                if (data.error) {
                    throw new Error(data.error);
                }
                console.log(data);
                // setConversations(data);
                setConversations([...data, ...groupdata]);
                console.log(conversations);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { loading, conversations };
};
export default useGetConversations;

export const useGetUserGroups = () => {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true;  // Flag to manage cleanup and prevent state update after unmount

        const fetchGroups = async () => {
            if (!userId) {
                setError('User ID is required');
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);  // Reset previous errors

            try {
                const response = await fetch(`/api/groups/allgroups/${userId}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                if (isMounted) {
                    setGroups(data);  // Set groups data
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message);  // Set error message
                }
            } finally {
                if (isMounted) {
                    setLoading(false);  // Reset loading state
                }
            }
        };

        fetchGroups();

        return () => {
            isMounted = false;  // Set isMounted to false when the component unmounts
        };
    }, [userId]);  // Effect dependencies

    return { groups, loading, error };
};