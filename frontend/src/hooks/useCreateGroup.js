import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useCreateGroup = async ({groupMembers, groupName}) => {
	const [loading, setLoading] = useState(false);
	const [conversations, setConversations] = useState([]);
    console.log({groupMembers, groupName});
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
				console.log(data);
				setConversations(data);
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
