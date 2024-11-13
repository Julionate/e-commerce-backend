import { DataTypes } from "sequelize";
import { sequelizeAuth } from "../config/database.mjs";

const User = sequelizeAuth.define("usuarios", {
  idUsuario: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  Usuario: {
    type: DataTypes.STRING, // Nombre del usuario (columna tipo STRING)
    allowNull: false, // Campo obligatorio
  },
  Correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // El correo debe ser único
  },
  Contrasena: {
    type: DataTypes.STRING, // Contraseña hasheada
    allowNull: false,
  },
});

sequelizeAuth
  .sync({ force: false })
  .then(() => {
    console.log("Tabla usuarios sincronizada");
  })
  .catch((err) => {
    console.error("Error al sincronizar la tabla:", err);
  });

export default User;
