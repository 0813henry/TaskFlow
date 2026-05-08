const { AppError } = require("../../domain/errors/AppError");

/**
 * Centralized Express error handling middleware.
 * Must be the LAST middleware registered in app.js (4-parameter signature required).
 *
 * Maps typed domain errors → HTTP status codes.
 * All unhandled errors return 500.
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] ${err.name}: ${err.message}`);

  // JWT library errors
  if (err.name === "JsonWebTokenError" || err.name === "NotBeforeError") {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ success: false, message: "Token expired" });
  }

  // Mongoose cast / duplicate key errors
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ success: false, message: "Invalid ID format" });
  }
  if (err.code === 11000) {
    return res
      .status(409)
      .json({
        success: false,
        message: "Duplicate value: resource already exists",
      });
  }

  // Typed application errors (NotFoundError, UnauthorizedError, etc.)
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  // Unexpected errors — don't leak internals in production
  res.status(500).json({ success: false, message: "Internal server error" });
};

module.exports = errorHandler;
