import { Sequelize } from "sequelize";

const sequelize_s = new Sequelize("stock_db", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión a la base de datos establecida con éxito.");
  })
  .catch((err) => {
    if (err.message.includes("Unknown database"))
      return console.error("Base de datos no encontrado");
    console.error("No se pudo conectar a la base de datos:", err.message);
  });

export default sequelize_s;
