import { Router } from "express";
import { CartController } from "../controllers/cartController.mjs";
import { authenticateToken } from "../middlewares/verifyTokenMiddleware.mjs";
export const CartRouter = Router();

CartRouter.get("/get", authenticateToken, CartController.getCart);

CartRouter.post("/add", authenticateToken, CartController.addToCart);

CartRouter.get("/remove", (req, res) =>
  res.status(200).json({ message: "hola2" })
);
