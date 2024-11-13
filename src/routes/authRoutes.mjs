import { Router } from "express";
import { authController } from "../controllers/authController.mjs";

export const authRouter = Router();

authRouter.post("/login", authController.Login);
authRouter.post("/register", authController.Register);
authRouter.get("/verify-token", authController.VerifyToken);
