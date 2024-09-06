import express from "express";
import { createGroup, getGroupMembers, getGroups } from "../controllers/group.controller.js";
import { addMessage } from "../controllers/groupchat.controller.js";
import { getGroupMessages } from "../controllers/getGroupMessages.controller.js";
import protectRoute from "../middleware/protectRoute.js";


const router = express.Router();

router.post('/create',protectRoute,createGroup);
router.post('/chat',addMessage);
router.get('/getmessages/:groupId',getGroupMessages);
router.get("/getMembers/:groupId", getGroupMembers);
router.post('/allgroups', protectRoute, getGroups);



export default router;