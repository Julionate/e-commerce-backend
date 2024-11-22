import axios from "axios";

export class ProductService {
  constructor() {
    this.baseURL = "http://localhost:8000/scripts/";
  }

  GetAllProducts = async (page = 1, limit = 12) => {
    try {
      const response = await axios.get(`${this.baseURL}getAllProducts.php`, {
        params: { page, limit },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };

  SearchProduct = async (page = 1, limit = 12, search = "", marcas = "") => {
    try {
      const response = await axios.get(`${this.baseURL}SearchProduct.php`, {
        params: { page, limit, search, marcas },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };

  GetMarcas = async () => {
    try {
      const response = await axios.get(`${this.baseURL}GetMarcas.php`);
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };

  GetProduct = async (productId) => {
    try {
      const response = await axios.get(`${this.baseURL}GetProduct.php`, {
        params: { productId },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };

  GetProductImages = async (productId) => {
    try {
      const response = await axios.get(`${this.baseURL}GetProductImages.php`, {
        params: { productId },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };

  GetProductReviews = async (productId) => {
    try {
      const response = await axios.get(`${this.baseURL}GetProductReviews.php`, {
        params: { productId },
      });
      return response.data;
    } catch (error) {
      console.error(
        "Ha ocurrido un error al comunicarse con la base de datos:",
        error.message
      );
    }
  };

  PostReview = async (id, idProducto, critica, valoracion) => {
    try {
      const response = await axios.post(`${this.baseURL}PostReview.php`, {
        idUsuario: id,
        idProducto,
        critica,
        valoracion,
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
