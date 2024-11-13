import { z } from "zod";

// Esquema para login
export const loginSchema = z.object({
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

// Esquema para registro
export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
  email: z.string().email("Debe ser un email válido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
});

export const cartSchema = z.object({
  idUser: z.string(),
  idProduct: z.number().min(1),
  cantidad: z.number(),
});
