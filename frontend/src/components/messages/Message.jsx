// import { useAuthContext } from "../../context/AuthContext";
// import { extractTime } from "../../utils/extractTime";
// import useConversation from "../../zustand/useConversation";

// const Message = ({ message }) => {
// 	const { authUser } = useAuthContext();
// 	const { selectedConversation } = useConversation();
// 	const fromMe = message.senderId === authUser._id;
// 	// console.log(fromMe,"id")
// 	console.log(message,"messages")
// 	const formattedTime = extractTime(message.createdAt);
// 	const chatClassName = fromMe ? "chat-end" : "chat-start";
// 	const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
// 	const bubbleBgColor = fromMe ? "bg-blue-500" : "";

// 	const shakeClass = message.shouldShake ? "shake" : "";

// 	return (
// 		<div className={`chat ${chatClassName}`}>
// 			<div className='chat-image avatar'>
// 				<div className='w-10 rounded-full'>
// 					<img alt='Tailwind CSS chat bubble component' src={profilePic} />
// 				</div>
// 			</div>
// 			<div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message || message?.content}</div>
// 			<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
// 		</div>
// 	);
// };
// export default Message;
import { useState, useEffect } from 'react';
import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
    if (!message) return null; // Return null if no message data is available

    const { authUser } = useAuthContext();
    const { selectedConversation } = useConversation();
    const fromMe = message.senderId === authUser._id;
    const formattedTime = extractTime(message.createdAt);
    const chatClassName = fromMe ? "chat-end" : "chat-start";
    const profilePic = fromMe ? authUser.profilePic : selectedConversation?.profilePic;
    const bubbleBgColor = fromMe ? "bg-blue-500" : "";
    const shakeClass = message.shouldShake ? "shake" : "";

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);  // Sets the delay for 2 seconds

        return () => clearTimeout(timer); // Clean up the timer on component unmount
    }, [message]); // Dependency on message to reset the timer if the message changes

    if (!isVisible) return null; // Do not render anything until the timer has finished

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img alt='User profile pic' src={profilePic} />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>
                {message.message || message.content} 
            </div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>
                {formattedTime}
            </div>
        </div>
    );
};

export default Message;
