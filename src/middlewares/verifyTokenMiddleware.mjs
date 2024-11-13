import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.mjs";

// Middleware para verificar el token JWT
export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extrae el token del encabezado

  if (token == null) return res.sendStatus(401); // Si no hay token, no autorizado

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Token inválido o expirado

    req.user = user; // Almacena la información del usuario en la request
    next(); // Continua con la siguiente función
  });
}
