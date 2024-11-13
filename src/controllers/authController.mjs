import User from "../models/users.mjs";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../schemas/validationSchemas.mjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/config.mjs";
import { SALT } from "../config/config.mjs";

export class authController {
  static async Login(req, res) {
    const { email, password } = req.body;

    try {
      loginSchema.parse({ email, password });
    } catch (err) {
      return res.status(400).json(authController.handleError(err));
    }

    const user = await User.findOne({ where: { Correo: email } });

    if (!user) {
      return res.status(401).json({ message: "Usuario no existente" });
    }

    const isValid = await bcrypt.compare(password, user.Contrasena);
    if (!isValid) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const token = jwt.sign(
      { id: user.idUsuario, email: user.Correo, username: user.Usuario },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .status(200)
      .json({ message: `Bienvenido, ${user.Usuario}`, token: token });
  }

  static async Register(req, res) {
    const { username, email, password } = req.body;

    try {
      registerSchema.parse({ username, email, password });
    } catch (err) {
      return res.status(400).json(authController.handleError(err));
    }

    const user = await User.findOne({ where: { Usuario: username } });

    if (user) {
      return res.status(401).json({ message: "El usuario ya existe." });
    }

    const hashedPassword = await bcrypt.hash(password, SALT);

    const newUser = await User.create({
      idUsuario: crypto.randomUUID(),
      Usuario: username,
      Correo: email,
      Contrasena: hashedPassword,
    });

    return res.status(200).json({ message: "Registro exitoso" });
  }

  static async VerifyToken(req, res) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Extrae el token del encabezado

    if (token == null) return res.sendStatus(401); // Si no hay token, no autorizado

    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      return res.status(200).json({ message: "token válido" });
    });
  }

  static handleError(err) {
    return { field: err.issues[0].path[0], message: err.issues[0].message };
  }
}
