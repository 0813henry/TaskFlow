import { createContext, useContext, useState, useCallback } from "react";
import taskService from "../services/taskService";
import toast from "react-hot-toast";

const TaskContext = createContext();

/**
 * TaskProvider — manages the task list state.
 *
 * Exposes: tasks, loading, fetchTasks(), createTask(), updateTask(), deleteTask()
 * Pages call fetchTasks() manually on mount — the context never fetches automatically.
 */
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  /**
   * Fetch tasks from the API, optionally filtered by status.
   * Memoized with useCallback so pages can safely include it in useEffect deps.
   */
  const fetchTasks = useCallback(async (status = null) => {
    setLoading(true);
    try {
      const res = await taskService.getAll(status);
      setTasks(res.data.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al cargar las tareas");
    } finally {
      setLoading(false);
    }
  }, []);

  const createTask = async (data) => {
    const res = await taskService.create(data);
    setTasks((prev) => [res.data.data, ...prev]);
    return res.data.data;
  };

  const updateTask = async (id, data) => {
    const res = await taskService.update(id, data);
    setTasks((prev) => prev.map((t) => (t._id === id ? res.data.data : t)));
    return res.data.data;
  };

  const deleteTask = async (id) => {
    await taskService.remove(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <TaskContext.Provider
      value={{ tasks, loading, fetchTasks, createTask, updateTask, deleteTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export const useTasks = () => useContext(TaskContext);
