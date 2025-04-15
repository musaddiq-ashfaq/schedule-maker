import express from "express";
import protect from "../middlewares/authMiddleware.js";
import { registerUser, loginUser, getUserProfile } from "../controllers/userController.js";

const router = express.Router();

router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);

export default router;