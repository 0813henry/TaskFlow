const ITaskRepository = require("../../domain/repositories/ITaskRepository");
const TaskModel = require("../database/models/TaskModel");

/**
 * MongoTaskRepository — Adapter implementing ITaskRepository.
 * All Mongoose operations are encapsulated here.
 */
class MongoTaskRepository extends ITaskRepository {
  async save(task) {
    return TaskModel.create({
      title: task.title,
      description: task.description,
      status: task.status,
      userId: task.userId,
    });
  }

  /**
   * @param {string} userId
   * @param {string|null} status — null means no status filter
   */
  async findByUserId(userId, status = null) {
    const query = { userId };
    if (status) query.status = status;
    return TaskModel.find(query).sort({ createdAt: -1 }).lean();
  }

  async findById(id) {
    return TaskModel.findById(id).lean();
  }

  async update(id, updates) {
    return TaskModel.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).lean();
  }

  async delete(id) {
    const result = await TaskModel.findByIdAndDelete(id);
    return !!result;
  }
}

module.exports = MongoTaskRepository;
