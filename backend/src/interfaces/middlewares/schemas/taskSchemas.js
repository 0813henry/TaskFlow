const { z } = require("zod");

const createTaskSchema = z.object({
  title: z
    .string({ required_error: "Title is required" })
    .min(1, "Title cannot be empty")
    .trim(),
  description: z.string().optional().default(""),
  status: z
    .enum(["pendiente", "en progreso", "completada"], {
      errorMap: () => ({
        message: "Status must be: pendiente, en progreso, or completada",
      }),
    })
    .optional()
    .default("pendiente"),
});

const updateTaskSchema = z.object({
  title: z.string().min(1, "Title cannot be empty").trim().optional(),
  description: z.string().optional(),
  status: z
    .enum(["pendiente", "en progreso", "completada"], {
      errorMap: () => ({
        message: "Status must be: pendiente, en progreso, or completada",
      }),
    })
    .optional(),
});

module.exports = { createTaskSchema, updateTaskSchema };
