const { Task } = require("../../../domain/entities/Task");

/**
 * Use case: Create a new task for the authenticated user.
 * The domain entity validates title and status before persistence.
 */
class CreateTaskUseCase {
  /** @param {import('../../../domain/repositories/ITaskRepository')} taskRepository */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * @param {{ title: string, description?: string, status?: string, userId: string }} dto
   * @returns {Promise<Object>} Created task document
   */
  async execute({ title, description, status, userId }) {
    const task = new Task({ title, description, status, userId });
    return this.taskRepository.save(task);
  }
}

module.exports = CreateTaskUseCase;
