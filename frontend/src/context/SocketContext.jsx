import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";
import useConversation from "../zustand/useConversation";

const SocketContext = createContext();

export const useSocketContext = () => {
 return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
 const [socket, setSocket] = useState(null);
 const [onlineUsers, setOnlineUsers] = useState([]);
 const [groupMessages, setGroupMessages] = useState({});
 const { authUser } = useAuthContext();
 const { selectedConversation } = useConversation();

 useEffect(() => {
 if (authUser) {
 const socket = io("http://localhost:8000", {
 query: {
 userId: authUser._id,
 },
 });

 setSocket(socket);

 // Listen for online users
 socket.on("getOnlineUsers", (users) => {
 setOnlineUsers(users);
 });

 // Example: Listen for group messages
 

 // Optionally, listen for other group-related events (e.g., group created, user joined)

 // Clean up the socket connection
 return () => {
 socket.disconnect();
 setSocket(null);
 };
 } else {
 // Clean up if authUser is not available
 if (socket) {
 socket.disconnect();
 setSocket(null);
 }
 }
 }, [authUser]);

 const joinGroup = (groupId) => {
 console.log("groupId", groupId)
 if (socket) {
 // console.log("join group")
 socket.emit("joinGroup", groupId);
 }
 };

 const leaveGroup = (groupId) => {
 if (socket) {
 socket.emit("leaveGroup", groupId);
 }
 };

 return (
 <SocketContext.Provider
 value={{
 socket,
 onlineUsers,
 groupMessages,
 joinGroup,
 leaveGroup,
 }}
 >
 {children}
 </SocketContext.Provider>
 );
};