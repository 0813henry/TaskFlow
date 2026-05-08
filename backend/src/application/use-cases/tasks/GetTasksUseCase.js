/**
 * Use case: Retrieve all tasks for the authenticated user.
 * Optionally filters by status. Task ownership is enforced via userId.
 */
class GetTasksUseCase {
  /** @param {import('../../../domain/repositories/ITaskRepository')} taskRepository */
  constructor(taskRepository) {
    this.taskRepository = taskRepository;
  }

  /**
   * @param {{ userId: string, status?: string|null }} dto
   * @returns {Promise<Object[]>}
   */
  async execute({ userId, status = null }) {
    return this.taskRepository.findByUserId(userId, status);
  }
}

module.exports = GetTasksUseCase;
