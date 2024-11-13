import { Sequelize, DataTypes } from "sequelize";
import { sequelizeStock } from "../config/database.mjs"; // Asegúrate de que la ruta sea correcta

const Review = sequelizeStock.define(
  "critica",
  {
    idCritica: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    idProducto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    Critica: {
      type: DataTypes.STRING(2500),
      allowNull: false,
    },
    Valoracion: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },
  },
  {
    tableName: "criticas",
    timestamps: false,
  }
);

export default Review;
