import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FileText,
  AlignLeft,
  Tag,
  ArrowLeft,
  Save,
  Circle,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useTasks } from "../context/TaskContext";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import { STATUS_OPTIONS } from "../utils/statusHelpers";
import taskService from "../services/taskService";
import toast from "react-hot-toast";

const INITIAL_FORM = { title: "", description: "", status: "pendiente" };

const STATUS_ICONS = {
  pendiente: {
    icon: Circle,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.12)",
    border: "rgba(245,158,11,0.3)",
  },
  "en progreso": {
    icon: Clock,
    color: "#818cf8",
    bg: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.3)",
  },
  completada: {
    icon: CheckCircle,
    color: "#4ade80",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.25)",
  },
};

export default function TaskFormPage() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { createTask, updateTask } = useTasks();

  const [form, setForm] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(isEdit);

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

  const statusConf = STATUS_ICONS[form.status];
  const StatusIcon = statusConf?.icon ?? Circle;

  return (
    <MainLayout>
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        {/* Back button */}
        <button
          onClick={() => navigate("/tasks")}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 mb-6 transition-colors"
        >
          <ArrowLeft size={15} />
          Volver al tablero
        </button>

        <div className="glass-card p-7">
          <div className="flex items-center gap-3 mb-7">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.12)" }}
            >
              <FileText size={17} style={{ color: "#F59E0B" }} />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-100">
                {isEdit ? "Editar tarea" : "Nueva tarea"}
              </h1>
              <p className="text-xs text-slate-500">
                {isEdit
                  ? "Modifica los campos necesarios"
                  : "Completa los campos para crear"}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                <FileText size={12} />
                Título{" "}
                <span className="text-red-400 normal-case tracking-normal">
                  *
                </span>
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                placeholder="¿Qué necesitas hacer?"
                className="input-glass"
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                <AlignLeft size={12} />
                Descripción
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows={4}
                placeholder="Detalles opcionales..."
                className="input-glass resize-none"
              />
            </div>

            {/* Status – visual selector */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">
                <Tag size={12} />
                Estado
              </label>
              <div className="grid grid-cols-3 gap-2">
                {STATUS_OPTIONS.map((opt) => {
                  const conf = STATUS_ICONS[opt.value];
                  const Ic = conf?.icon ?? Circle;
                  const active = form.status === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setForm((prev) => ({ ...prev, status: opt.value }))
                      }
                      className="flex flex-col items-center gap-2 py-3 px-2 rounded-xl text-xs font-medium transition-all duration-200"
                      style={{
                        background: active
                          ? conf?.bg
                          : "rgba(255,255,255,0.03)",
                        border: `1px solid ${active ? conf?.border : "rgba(255,255,255,0.06)"}`,
                        color: active ? conf?.color : "#64748b",
                        boxShadow: active
                          ? `0 0 12px ${conf?.color}20`
                          : undefined,
                      }}
                    >
                      <Ic
                        size={16}
                        style={{ color: active ? conf?.color : "#475569" }}
                      />
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/tasks")}
                className="btn-ghost flex-1 flex items-center justify-center gap-2"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="btn-gold flex-1 flex items-center justify-center gap-2"
              >
                <Save size={15} />
                {loading
                  ? "Guardando..."
                  : isEdit
                    ? "Actualizar"
                    : "Crear tarea"}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </MainLayout>
  );
}
