import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { STATUS_OPTIONS } from "../utils/statusHelpers";
import taskService from "../services/taskService";
import toast from "react-hot-toast";

const INITIAL_FORM = { title: "", description: "", status: "pendiente" };

/**
 * Reusable form for both creating and editing tasks.
 * Edit mode is detected by the presence of :id in the URL.
 */
export default function TaskFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { createTask, updateTask } = useTasks();

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

  // Load existing task data in edit mode
  useEffect(() => {
    if (!isEdit) return;
    taskService
      .getById(id)
      .then((res) => {
        const { title, description, status } = res.data.data;
        setForm({ title, description, status });
      })
      .catch(() => {
        toast.error("Tarea no encontrada");
        navigate("/tasks");
      })
      .finally(() => setFetching(false));
  }, [id, isEdit, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error("El título es obligatorio");
      return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await updateTask(id, form);
        toast.success("Tarea actualizada");
      } else {
        await createTask(form);
        toast.success("Tarea creada");
      }
      navigate("/tasks");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al guardar la tarea");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <MainLayout>
        <LoadingSpinner />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-slate-100 mb-6">
          {isEdit ? "Editar tarea" : "Nueva tarea"}
        </h1>

        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Título <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="¿Qué necesitas hacer?"
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Descripción
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Detalles opcionales..."
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              />
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Estado
              </label>
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              >
                {STATUS_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className="bg-slate-700"
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2.5 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-2.5 rounded-lg transition-colors"
              >
                {loading
                  ? "Guardando..."
                  : isEdit
                    ? "Actualizar"
                    : "Crear tarea"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
