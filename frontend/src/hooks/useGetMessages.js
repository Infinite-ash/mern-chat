import { useEffect, useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useGetMessages = () => {
	const [loading, setLoading] = useState(false);
	const { messages, setMessages, selectedConversation } = useConversation();

	useEffect(() => {
		const getMessages = async () => {
			setLoading(true);
			try {
				console.log("selected",selectedConversation)
				if(selectedConversation?.groupName){
					const response = await fetch(`api/groups/getmessages/${selectedConversation._id}`);
					const groupdata = await response.json();
					console.log(groupdata.messages,"dataaaa")
					setMessages(groupdata.messages);
				}else{
					const res = await fetch(`/api/messages/${selectedConversation._id}`);
					const data = await res.json();
					if (data.error){ throw new Error(data.error);}
					setMessages(data);


				}
				// const res = await fetch(`/api/messages/${selectedConversation._id}`);
				// const response = await fetch(`api/groups/getmessages/${selectedConversation._id}`);
				// // console.log(selectedConversation);
				// let data = "";
				// data = await res.json();
				// console.log("data",data)
				// const groupdata = await response.json();
				// console.log("groupdata",groupdata);
				// if (data.error){ throw new Error(data.error);}
				// console.log("check", groupdata.messages);
				// // setMessages(data !=="" ? data : groupdata?.messages);
				// if (data && data.length > 0) {
				// 	// If one-to-one conversation messages exist
				// 	setMessages(data);
				//   } else if (groupdata && groupdata.messages && groupdata.messages.length > 0) {
				// 	// If group messages exist
				// 	setMessages(groupdata.messages);
				//   } else {
				// 	// If no messages are found, set to an empty array or handle as needed
				// 	setMessages([]);
				//   }
				// console.log("messages",messages)
			} catch (error) {
				toast.error(error.message);
			} finally {
				setLoading(false);
			}
		};

		if (selectedConversation?._id) getMessages();
	}, [selectedConversation?._id, setMessages]);

	return { messages, loading, setMessages };
};
export default useGetMessages;
