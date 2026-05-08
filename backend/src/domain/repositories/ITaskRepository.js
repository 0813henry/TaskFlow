/**
 * ITaskRepository — Port (abstract interface) for task persistence.
 *
 * Application use cases depend on this interface, never on Mongoose directly.
 * Infrastructure adapters implement this class (MongoTaskRepository).
 *
 * @interface
 */
class ITaskRepository {
  /** @param {import('../entities/Task').Task} task @returns {Promise<Object>} Persisted task document */
  async save(task) {
    throw new Error("ITaskRepository.save() not implemented");
  }

  /**
   * @param {string} userId
   * @param {string|null} [status] — filter by status, null = all
   * @returns {Promise<Object[]>}
   */
  async findByUserId(userId, status = null) {
    throw new Error("ITaskRepository.findByUserId() not implemented");
  }

  /** @param {string} id @returns {Promise<Object|null>} */
  async findById(id) {
    throw new Error("ITaskRepository.findById() not implemented");
  }

  /** @param {string} id @param {Object} updates @returns {Promise<Object|null>} Updated document */
  async update(id, updates) {
    throw new Error("ITaskRepository.update() not implemented");
  }

  /** @param {string} id @returns {Promise<boolean>} */
  async delete(id) {
    throw new Error("ITaskRepository.delete() not implemented");
  }
}

module.exports = ITaskRepository;
