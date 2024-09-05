import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}
const socketGroupMap = {}; // {socketId: Set of groupIds}

io.on("connection", (socket) => {
    console.log("a user connected", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));

    socketGroupMap[socket.id] = new Set();

    socket.on("joinGroup", (groupId) => {
        socket.join(groupId);
        socketGroupMap[socket.id].add(groupId);
        console.log(`User ${socket.id} joined group with ID: ${groupId}`);
    });

    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);

        const groups = socketGroupMap[socket.id];
        if (groups) {
            groups.forEach((groupId) => {
                socket.leave(groupId);
                console.log(`User ${socket.id} left group with ID: ${groupId}`);
            });
        }

        delete socketGroupMap[socket.id];
        delete userSocketMap[userId];

        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

// Exporting the necessary elements
export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

export { app, io, server };


















// import { Server } from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
// 	cors: {
// 		origin: ["http://localhost:3000"],
// 		methods: ["GET", "POST"],
// 	},
// });

// export const getReceiverSocketId = (receiverId) => {
// 	return userSocketMap[receiverId];
// };

// const userSocketMap = {}; // {userId: socketId}

// io.on("connection", (socket) => {
// 	console.log("a user connected", socket.id);

// 	const userId = socket.handshake.query.userId;
// 	if (userId != "undefined") userSocketMap[userId] = socket.id;

// 	// io.emit() is used to send events to all the connected clients
// 	io.emit("getOnlineUsers", Object.keys(userSocketMap));


// 	socket.on("joinGroup", (groupId) => {
//         socket.join(groupId);
//         console.log(`User joined group with ID: ${groupId}`);
//     });

// 	// socket.on() is used to listen to the events. can be used both on client and server side
// 	socket.on("disconnect", () => {
// 		socket.leave(groupId);
// 		console.log("user disconnected", socket.id);
// 		delete userSocketMap[userId];
// 		io.emit("getOnlineUsers", Object.keys(userSocketMap));
// 	});
// });

// export { app, io, server };
