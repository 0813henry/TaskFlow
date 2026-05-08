const bcrypt = require("bcrypt");
const IUserRepository = require("../../domain/repositories/IUserRepository");
const UserModel = require("../database/models/UserModel");

const SALT_ROUNDS = 12;

/**
 * MongoUserRepository — Adapter implementing IUserRepository.
 *
 * This is the ONLY place where bcrypt is used.
 * Domain and application layers stay pure by delegating hashing here.
 */
class MongoUserRepository extends IUserRepository {
  /**
   * Hashes the password and persists the user.
   * @param {import('../../domain/entities/User')} user
   */
  async save(user) {
    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
    return UserModel.create({
      nombre: user.nombre,
      email: user.email,
      password: hashedPassword,
    });
  }

  async findByEmail(email) {
    return UserModel.findOne({ email: email.toLowerCase().trim() }).lean();
  }

  async findById(id) {
    return UserModel.findById(id).lean();
  }

  /**
   * bcrypt comparison — infrastructure concern, not domain logic.
   * @param {string} plainPassword
   * @param {string} hash
   */
  async verifyPassword(plainPassword, hash) {
    return bcrypt.compare(plainPassword, hash);
  }
}

module.exports = MongoUserRepository;
