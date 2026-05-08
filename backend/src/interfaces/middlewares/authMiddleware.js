const JwtService = require("../../infrastructure/services/JwtService");
const { UnauthorizedError } = require("../../domain/errors/AppError");

const jwtService = new JwtService();

/**
 * Auth middleware — protects routes by verifying the Bearer JWT.
 *
 * On success: attaches req.user = { id, email } for downstream handlers.
 * On failure: passes a typed error to the centralized error handler.
 *
 * Apply to task routes: router.use(authMiddleware)
 */
const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new UnauthorizedError("No token provided");
    }

    const token = authHeader.split(" ")[1];
    const payload = jwtService.verify(token); // throws JsonWebTokenError / TokenExpiredError

    req.user = { id: payload.id, email: payload.email };
    next();
  } catch (err) {
    next(err); // propagates to errorHandler
  }
};

module.exports = authMiddleware;
