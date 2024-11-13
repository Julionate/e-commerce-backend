import { Sequelize } from "sequelize";

// Configuración de la base de datos de autenticación
const sequelizeAuth = new Sequelize("auth_db", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

// Configuración de la base de datos de stock (aquí puedes cambiar el nombre de la base de datos si es diferente)
const sequelizeStock = new Sequelize("stock_db", "root", "123456", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
});

// Función para autenticar la conexión
const authenticateDatabase = async (sequelizeInstance, dbName) => {
  try {
    await sequelizeInstance.authenticate();
    console.log(`Conexión a la base de datos ${dbName} establecida con éxito.`);
  } catch (err) {
    if (err.message.includes("Unknown database"))
      return console.error(`Base de datos ${dbName} no encontrada`);
    console.error(
      `No se pudo conectar a la base de datos ${dbName}:`,
      err.message
    );
  }
};

// Autenticación de ambas bases de datos
authenticateDatabase(sequelizeAuth, "auth_db");
authenticateDatabase(sequelizeStock, "stock_db");

// Exportar las instancias de Sequelize
export { sequelizeAuth, sequelizeStock };
