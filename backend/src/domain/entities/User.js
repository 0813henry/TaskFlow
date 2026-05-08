/**
 * User — domain entity.
 * Pure JS class with zero framework/library imports.
 * Validates its own invariants in the constructor.
 */
class User {
  /**
   * @param {{ id?: string|null, nombre: string, email: string, password: string, createdAt?: Date }} params
   */
  constructor({ id = null, nombre, email, password, createdAt = new Date() }) {
    if (!nombre || nombre.trim() === "") throw new Error("Name is required");
    if (!email || email.trim() === "") throw new Error("Email is required");
    if (!password) throw new Error("Password is required");

    this.id = id;
    this.nombre = nombre.trim();
    this.email = email.toLowerCase().trim();
    this.password = password;
    this.createdAt = createdAt;
  }
}

module.exports = User;
