const {
  NotFoundError,
  ForbiddenError,
} = require("../../../domain/errors/AppError");
const { VALID_STATUSES } = require("../../../domain/entities/Task");

/**
 * Use case: Update a task's fields.
 * Verifies ownership before applying changes.
 */
class UpdateTaskUseCase {
  /** @param {import('../../../domain/repositories/ITaskRepository')} taskRepository */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * @param {{ taskId: string, userId: string, title?: string, description?: string, status?: string }} dto
   * @returns {Promise<Object>} Updated task document
   */
  async execute({ taskId, userId, title, description, status }) {
    const existing = await this.taskRepository.findById(taskId);
    if (!existing) throw new NotFoundError("Task not found");

    const taskUserId = existing.userId?.toString();
    if (taskUserId !== userId.toString()) {
      throw new ForbiddenError("Access to this task is not allowed");
    }

    if (status !== undefined && !VALID_STATUSES.includes(status)) {
      throw new Error(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
    }

    // Build partial update — only include provided fields
    const updates = {};
    if (title !== undefined) updates.title = title;
    if (description !== undefined) updates.description = description;
    if (status !== undefined) updates.status = status;

    return this.taskRepository.update(taskId, updates);
  }
}

module.exports = UpdateTaskUseCase;
