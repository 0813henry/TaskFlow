import api from "./api";

const authService = {
  /** @param {{ nombre: string, email: string, password: string }} data */
  register: (data) => api.post("/auth/register", data),

  /** @param {{ email: string, password: string }} data */
  login: (data) => api.post("/auth/login", data),
};

export default authService;
