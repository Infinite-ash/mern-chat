import express from "express";
import { ai, login, logout, signup } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup, ai);

router.post("/login", login);

router.post("/logout", logout);

export default router;
