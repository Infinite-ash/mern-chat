import { useState } from "react";
import useConversation from "../zustand/useConversation";
import toast from "react-hot-toast";

const useSendMessage = () => {
    const [loading, setLoading] = useState(false);
    const { messages, setMessages, selectedConversation } = useConversation();
//   console.log(messages,"messgaes checking")
    const sendMessage = async (message) => {
        setLoading(true);
        try {
            if(selectedConversation?.groupName){

                const senderId = JSON.parse(localStorage.getItem('chat-user')); // Parse the stored string into an object
                console.log("senderId",senderId);
                const res = await fetch(`/api/groups/chat`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ content:message, groupId:selectedConversation._id, senderId:senderId._id   }),
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                console.log("data",data);
                setMessages([...messages, data.newMessage]);
                    
            }else{
                const res = await fetch(`/api/messages/send/${selectedConversation._id}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ message }),
                });
                const data = await res.json();
                if (data.error) throw new Error(data.error);
                    if(data.aiMessage){
                        setMessages([...messages, data.userMessage, data?.aiMessage]);
                    }else{
                        setMessages([...messages, data]);
                    }
            }
            
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { sendMessage, loading };
};
export default useSendMessage;