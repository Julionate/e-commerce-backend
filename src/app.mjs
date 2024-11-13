import express from "express";
import { startPHPServer } from "../scripts/LevantarServidorPHP.mjs";
import { ProductosRouter } from "./routes/productRoutes.mjs";
import { corsMiddleware } from "./middlewares/cors.mjs";
import { authRouter } from "./routes/authRoutes.mjs";
import { sequelizeAuth, sequelizeStock } from "../src/config/database.mjs";
import { handleJsonErrors } from "./middlewares/handleJsonErrors.mjs";
import bodyParser from "body-parser";
import { CartRouter } from "./routes/cartRoutes.mjs";

const app = express();

app.use(
  bodyParser.json({
    strict: true,
    limit: "10mb",
  })
);

app.use(handleJsonErrors);

app.use(corsMiddleware());

app.disable("x-powered-by");
const PORT = 3000;

app.use(express.json());
startPHPServer();

app.use("/products", ProductosRouter);
app.use("/cart", CartRouter);
app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
