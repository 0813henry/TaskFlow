const User = require("../../../domain/entities/User");
const { ConflictError } = require("../../../domain/errors/AppError");

/**
 * Use case: Register a new user.
 * Receives the IUserRepository port via constructor injection.
 * Never imports Mongoose, bcrypt, or any infrastructure detail.
 */
class RegisterUserUseCase {
  /** @param {import('../../../domain/repositories/IUserRepository')} userRepository */
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * @param {{ nombre: string, email: string, password: string }} dto
   * @returns {Promise<{ id: string, nombre: string, email: string }>}
   */
  async execute({ nombre, email, password }) {
    // Check for duplicate email
    const existing = await this.userRepository.findByEmail(email);
    if (existing) {
      throw new ConflictError("This email is already registered");
    }

    // Domain entity validates structure (throws on bad input)
    const user = new User({ nombre, email, password });

    // Password hashing is an infrastructure concern — happens inside save()
    const saved = await this.userRepository.save(user);

    return {
      id: saved._id?.toString() || saved.id,
      nombre: saved.nombre,
      email: saved.email,
    };
  }
}

module.exports = RegisterUserUseCase;
