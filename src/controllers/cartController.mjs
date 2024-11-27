import { cartSchema } from "../schemas/validationSchemas.mjs";
import { CartService } from "../services/CartService.mjs";

const cartService = new CartService();

export class CartController {
  static async addToCart(req, res) {
    const { id } = req.user;
    const { idProduct, cantidad } = req.body;

    try {
      cartSchema.parse({ idUser: id, idProduct, cantidad });
    } catch (err) {
      return res.status(400).json(CartController.handleError(err));
    }

    const addToCartResponse = await cartService.AddToCart(
      id,
      idProduct,
      cantidad
    );
    return res.status(200).json(addToCartResponse);
  }

  static async setCart(req, res) {
    const { id } = req.user;
    const { idProduct, cantidad } = req.body;

    try {
      cartSchema.parse({ idUser: id, idProduct, cantidad });
    } catch (err) {
      return res.status(400).json(CartController.handleError(err));
    }

    const setCartResponse = await cartService.setCart(id, idProduct, cantidad);
    return res.status(200).json(setCartResponse);
  }

  static async getCart(req, res) {
    const { id } = req.user;

    const addToCartResponse = await cartService.GetCart(id);
    return res.status(200).json(addToCartResponse);
  }

  static async removeItem(req, res) {
    const { id } = req.user;
    const { idProduct } = req.query;
    try {
      cartSchema.parse({ idUser: id, idProduct: Number(idProduct) });
    } catch (err) {
      return res.status(400).json(CartController.handleError(err));
    }

    const removeItemResponse = await cartService.RemoveItem(id, idProduct);
    return res.status(200).json(removeItemResponse);
  }

  static handleError(err) {
    return { field: err.issues[0].path[0], message: err.issues[0].message };
  }
}
