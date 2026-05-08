const { UnauthorizedError } = require("../../../domain/errors/AppError");

/**
 * Use case: Authenticate a user and issue a JWT.
 * Receives IUserRepository and JwtService ports via constructor injection.
 * Uses the same error message for wrong email and wrong password to prevent
 * user enumeration attacks.
 */
class LoginUserUseCase {
  /**
   * @param {import('../../../domain/repositories/IUserRepository')} userRepository
   * @param {import('../../../infrastructure/services/JwtService')} jwtService
   */
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  /**
   * @param {{ email: string, password: string }} dto
   * @returns {Promise<{ token: string, user: { id: string, nombre: string, email: string } }>}
   */
  async execute({ email, password }) {
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError("Invalid credentials");
    }

    // Password verification (bcrypt.compare) is an infrastructure concern
    const isValid = await this.userRepository.verifyPassword(
      password,
      user.password,
    );
    if (!isValid) {
      throw new UnauthorizedError("Invalid credentials");
    }

    const payload = {
      id: user._id?.toString() || user.id,
      email: user.email,
    };
    const token = this.jwtService.sign(payload);

    return {
      token,
      user: {
        id: payload.id,
        nombre: user.nombre,
        email: user.email,
      },
    };
  }
}

module.exports = LoginUserUseCase;
