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
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(
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
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };
}
