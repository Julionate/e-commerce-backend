import { ProductService } from "../services/ProductService.mjs";

const productService = new ProductService();

export class ProductController {
  static async GetAllProducts(req, res) {
    const { page } = req.query;
    try {
      const response = await productService.GetAllProducts(page);
      if (response.length > 0) return res.status(200).json(response);
      res.status(404).json({ message: "No hay más productos" });
    } catch {
      res.status(404).json({
        message: "Ha ocurrido un error al comunicarse con la base de datos",
      });
    }
  }

  static async SearchProduct(req, res) {
    const { page, search, marcas, min, max } = req.query;
    try {
      const response = await productService.SearchProduct(
        page,
        undefined,
        search,
        marcas,
        min,
        max
      );
      if (response.length > 0) return res.status(200).json(response);
      res.status(404).json({ message: "No hay más productos" });
    } catch (error) {
      res.status(404).json({
        message: "Ha ocurrido un error al comunicarse con la base de datos",
        error: error.message,
      });
    }
  }

  static async GetMarcas(req, res) {
    try {
      const response = await productService.GetMarcas();
      if (response.length > 0) return res.status(200).json(response);
      res.status(404).json({ message: "No se han encontrado marcas" });
    } catch {
      res.status(404).json({
        message: "Ha ocurrido un error al comunicarse con la base de datos",
      });
    }
  }

  static async GetProduct(req, res) {
    const { productId } = req.query;
    try {
      const [productData, imagesData] = await Promise.all([
        productService.GetProduct(productId),
        productService.GetProductImages(productId),
      ]);

      const response = {
        producto: productData, // Datos del producto
        imagenes: imagesData, // Datos relacionados (por ejemplo, reseñas)
      };

      if (productData.length > 0) return res.status(200).json(response);

      res.status(404).json({ message: "No se han encontrado productos" });
    } catch (error) {
      res.status(404).json({
        message: "Ha ocurrido un error al comunicarse con la base de datos",
        error,
      });
    }
  }

  static async GetReviews(req, res) {
    const { productId } = req.query;
    try {
      const productReviews = await productService.GetProductReviews(productId);

      if (productReviews.length > 0)
        return res.status(200).json(productReviews);

      res.status(404).json({ Error: "No hay reseñas" });
    } catch (error) {
      res.status(404).json({
        message: "Ha ocurrido un error al comunicarse con la base de datos",
        error,
      });
    }
  }

  static async PostReview(req, res) {
    const { idProducto, critica, valoracion } = req.body;
    const { id } = req.user;
    try {
      const PostReview = await productService.PostReview(
        id,
        idProducto,
        critica,
        valoracion
      );
      return res.status(200).json(PostReview);
    } catch {
      return res
        .status(404)
        .json({ message: "Ha ocurrido un error inesperado." });
    }
  }
}
