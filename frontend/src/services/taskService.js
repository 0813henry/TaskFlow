import api from "./api";

const taskService = {
  /** @param {string|null} status - filter by status, null = all */
  getAll: (status) => api.get("/tasks", { params: status ? { status } : {} }),

  /** @param {string} id */
  getById: (id) => api.get(`/tasks/${id}`),

  /** @param {{ title: string, description?: string, status?: string }} data */
  create: (data) => api.post("/tasks", data),

  /** @param {string} id @param {Object} data */
  update: (id, data) => api.put(`/tasks/${id}`, data),

  /** @param {string} id */
  remove: (id) => api.delete(`/tasks/${id}`),
};

export default taskService;
