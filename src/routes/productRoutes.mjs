import { Router } from "express";
import { ProductController } from "../controllers/productController.mjs";
import { authenticateToken } from "../middlewares/verifyTokenMiddleware.mjs";
import { ProductService } from "../services/ProductService.mjs";

export const ProductosRouter = Router();

// El root entrega una paginación de 10 productos, se puede pasar como parámetro page=pagina
ProductosRouter.get("/", ProductController.GetAllProducts);
ProductosRouter.get("/search", ProductController.SearchProduct);
ProductosRouter.get("/marcas", ProductController.GetMarcas);
ProductosRouter.get("/product", ProductController.GetProduct);
ProductosRouter.get("/product/review", ProductController.GetReviews);
ProductosRouter.post(
  "/product/post-review",
  authenticateToken,
  ProductController.PostReview
);
