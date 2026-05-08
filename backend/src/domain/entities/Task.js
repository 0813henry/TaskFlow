/** Valid task status values — single source of truth. */
const VALID_STATUSES = ["pendiente", "en progreso", "completada"];

/**
 * Task — domain entity.
 * Pure JS class with zero framework/library imports.
 * Validates its own invariants in the constructor.
 */
class Task {
  /**
   * @param {{ id?: string|null, title: string, description?: string, status?: string, userId: string, createdAt?: Date }} params
   */
  constructor({
    id = null,
    title,
    description = "",
    status = "pendiente",
    userId,
    createdAt = new Date(),
  }) {
    if (!title || title.trim() === "") throw new Error("Title is required");
    if (!VALID_STATUSES.includes(status)) {
      throw new Error(`Status must be one of: ${VALID_STATUSES.join(", ")}`);
    }
    if (!userId) throw new Error("UserId is required");

    this.id = id;
    this.title = title.trim();
    this.description = description;
    this.status = status;
    this.userId = userId;
    this.createdAt = createdAt;
  }

  /**
   * Change the task status, enforcing allowed values.
   * @param {string} newStatus
   */
  updateStatus(newStatus) {
    if (!VALID_STATUSES.includes(newStatus)) {
      throw new Error(
        `Invalid status: "${newStatus}". Allowed: ${VALID_STATUSES.join(", ")}`,
      );
    }
    this.status = newStatus;
  }
}

module.exports = { Task, VALID_STATUSES };
