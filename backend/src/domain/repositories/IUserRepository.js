/**
 * IUserRepository — Port (abstract interface) for user persistence.
 *
 * Application use cases depend on this interface, never on Mongoose directly.
 * Infrastructure adapters implement this class (MongoUserRepository).
 *
 * @interface
 */
class IUserRepository {
  /** @param {import('../entities/User')} user @returns {Promise<Object>} Persisted user document */
  async save(user) {
    throw new Error("IUserRepository.save() not implemented");
  }

  /** @param {string} email @returns {Promise<Object|null>} */
  async findByEmail(email) {
    throw new Error("IUserRepository.findByEmail() not implemented");
  }

  /** @param {string} id @returns {Promise<Object|null>} */
  async findById(id) {
    throw new Error("IUserRepository.findById() not implemented");
  }

  /**
   * Compare a plain-text password against a stored hash (bcrypt).
   * Lives in the infrastructure adapter — domain stays pure.
   * @param {string} plainPassword
   * @param {string} hash
   * @returns {Promise<boolean>}
   */
  async verifyPassword(plainPassword, hash) {
    throw new Error("IUserRepository.verifyPassword() not implemented");
  }
}

module.exports = IUserRepository;
