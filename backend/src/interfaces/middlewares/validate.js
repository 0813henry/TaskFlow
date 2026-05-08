/**
 * Zod validation middleware factory.
 *
 * Usage:
 *   router.post('/route', validate(myZodSchema), controller)
 *
 * On failure: returns 400 with a human-readable message.
 * On success: replaces req.body with the coerced & sanitized data from Zod.
 */
const validate = (schema) => (req, res, next) => {
  const result = schema.safeParse(req.body);
  if (!result.success) {
    const message = result.error.errors.map((e) => e.message).join(", ");
    return res.status(400).json({ success: false, message });
  }
  req.body = result.data; // coerced + default values applied
  next();
};

module.exports = validate;
