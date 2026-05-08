const jwt = require("jsonwebtoken");

/**
 * JwtService — Infrastructure adapter for JWT signing and verification.
 * Reads JWT_SECRET and JWT_EXPIRES_IN from environment variables.
 * Injected into LoginUserUseCase as a dependency.
 */
class JwtService {
  /**
   * Signs a payload and returns a JWT string.
   * @param {{ id: string, email: string }} payload
   * @returns {string}
   */
  sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    });
  }

  /**
   * Verifies a token and returns the decoded payload.
   * Throws JsonWebTokenError or TokenExpiredError on failure — caught by errorHandler.
   * @param {string} token
   * @returns {{ id: string, email: string, iat: number, exp: number }}
   */
  verify(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = JwtService;
