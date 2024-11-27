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

  RemoveItem = async (idUsuario, idProducto) => {
    try {
      const response = await axios.delete(
        `${this.baseURL}RemoveItemFromCart.php`,
        {
          params: { idUsuario, idProducto },
        }
      );
      console.log(response.data);
      return response.data;
    } catch (err) {
      if (err.response) {
        console.error("Error del servidor:", err.response.data);
        return err.response.data;
      } else if (err.request) {
        console.error("Error de red:", err.message);
      } else {
        console.error("Error al configurar la solicitud:", err.message);
      }
    }
  };
}
