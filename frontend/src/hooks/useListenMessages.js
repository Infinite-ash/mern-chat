

// import { useEffect } from "react";
// import { useSocketContext } from "../context/SocketContext";
// import useConversation from "../zustand/useConversation";
// import notificationSound from "../assets/sounds/notification.mp3";

// const useListenMessages = () => {
//     const { socket, joinGroup, leaveGroup, groupMessages } = useSocketContext();
//     const { messages, setMessages, selectedConversation } = useConversation();

//     useEffect(() => {
//         // Ensure this effect runs whenever selectedConversation changes
//         if (selectedConversation?.groupId) {
//             console.log("Joining group:", selectedConversation.groupId);
//             joinGroup(selectedConversation.groupId);

//             const handleNewMessage = (newMessage) => {
//                 console.log("Received message:", newMessage);

//                 // Play notification sound
//                 newMessage.shouldShake = true;
//                 const sound = new Audio(notificationSound);
//                 sound.play();

//                 // Update messages state
//                 setMessages((prevMessages) => [...prevMessages, newMessage]);
//             };

//             socket?.on("newMessage", handleNewMessage);

//             return () => {
//                 leaveGroup(selectedConversation.groupId);
//                 socket?.off("newMessage", handleNewMessage);
//             };
//         }
//     }, [selectedConversation?.groupId, joinGroup, leaveGroup, socket, setMessages]);

//     return null; // This hook does not render anything
// };

// export default useListenMessages;












import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages = () => {
	const { socket, joinGroup, leaveGroup, groupMessages } = useSocketContext();
	const { messages, setMessages, selectedConversation } = useConversation();


	

	if(selectedConversation?.groupName){
		useEffect(() => {
			console.log("selectedConversation",selectedConversation);
			joinGroup(selectedConversation?._id);
			socket?.on("newGmessage", (newMessage) => {
				newMessage.shouldShake = true;
				const sound = new Audio(notificationSound);
				sound.play();
				// setMessages(prevMessages => [...prevMessages, { message: newMessage.content, receiverId: newMessage._id, ...newMessage }]);
				setMessages([...messages, {message:newMessage.content, receiverId:newMessage._id, ...newMessage}]);
				console.log("messages",messages);
			});
			return () => {
				leaveGroup(selectedConversation?.groupId);
			};
		}, [selectedConversation?.groupId, joinGroup, leaveGroup]);
	}else{
		useEffect(() => {
			socket?.on("newMessage", (newMessage) => {
				console.log("newMessage",newMessage);
				newMessage.shouldShake = true;
				const sound = new Audio(notificationSound);
				sound.play();
				setMessages([...messages, newMessage]);
				console.log("messages from one-one",messages)
			});
	
			return () => socket?.off("newMessage");
		}, [socket, setMessages, messages]);
	
	}
};
export default useListenMessages;
