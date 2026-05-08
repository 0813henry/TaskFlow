const {
  NotFoundError,
  ForbiddenError,
} = require("../../../domain/errors/AppError");

/**
 * Use case: Delete a task.
 * Verifies ownership before deletion.
 */
class DeleteTaskUseCase {
  /** @param {import('../../../domain/repositories/ITaskRepository')} taskRepository */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * @param {{ taskId: string, userId: string }} dto
   * @returns {Promise<{ message: string }>}
   */
  async execute({ taskId, userId }) {
    const existing = await this.taskRepository.findById(taskId);
    if (!existing) throw new NotFoundError("Task not found");

    const taskUserId = existing.userId?.toString();
    if (taskUserId !== userId.toString()) {
      throw new ForbiddenError("Access to this task is not allowed");
    }

    await this.taskRepository.delete(taskId);
    return { message: "Task deleted successfully" };
  }
}

module.exports = DeleteTaskUseCase;
