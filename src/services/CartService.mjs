import axios from "axios";

export class CartService {
  constructor() {
    this.baseURL = "http://localhost:8000/scripts/";
  }

  AddToCart = async (idUsuario, idProducto, cantidad) => {
    try {
      const response = await axios.post(`${this.baseURL}AddToCart.php`, {
        idUsuario,
        idProducto,
        cantidad,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };

  setCart = async (idUsuario, idProducto, cantidad) => {
    try {
      const response = await axios.post(`${this.baseURL}setCart.php`, {
        idUsuario,
        idProducto,
        cantidad,
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };

  GetCart = async (idUsuario) => {
    try {
      const response = await axios.get(`${this.baseURL}GetCart.php`, {
        params: { idUsuario },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };
}
