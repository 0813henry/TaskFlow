const {
  NotFoundError,
  ForbiddenError,
} = require("../../../domain/errors/AppError");

/**
 * Use case: Get a single task by ID.
 * Verifies ownership — users can only access their own tasks.
 */
class GetTaskByIdUseCase {
  /** @param {import('../../../domain/repositories/ITaskRepository')} taskRepository */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * @param {{ taskId: string, userId: string }} dto
   * @returns {Promise<Object>}
   */
  async execute({ taskId, userId }) {
    const task = await this.taskRepository.findById(taskId);
    if (!task) throw new NotFoundError("Task not found");

    const taskUserId = task.userId?.toString();
    if (taskUserId !== userId.toString()) {
      throw new ForbiddenError("Access to this task is not allowed");
    }

    return task;
  }
}

module.exports = GetTaskByIdUseCase;
