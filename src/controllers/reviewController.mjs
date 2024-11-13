import Review from "../models/reviews.mjs";
import jwt from "jsonwebtoken";

export class reviewController {
  static async createReview(req, res) {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No se proporcionó token." });
    }

    try {
      const decoded = jwt.verify(token, "PIKACHU123");

      const { productId, content } = req.body; // Obtener el contenido de la reseña

      // Crear una nueva reseña
      const newReview = await Review.create({
        userId: decoded.id,
        idProducto,
        Critica,
        Valoracion,
      });

      return res
        .status(201)
        .json({ message: "Reseña creada con éxito", review: newReview });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }
}
