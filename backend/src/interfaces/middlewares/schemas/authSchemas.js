const { z } = require("zod");

const registerSchema = z.object({
  nombre: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .trim(),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .trim(),
  password: z
    .string({ required_error: "Password is required" })
    .min(1, "Password is required"),
});

module.exports = { registerSchema, loginSchema };
