import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Pencil, Trash2 } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import StatusBadge from "./StatusBadge";
import toast from "react-hot-toast";

export default function TaskCard({ task }) {
  const navigate = useNavigate();
  const { deleteTask } = useTasks();

  const handleDelete = async () => {
    if (!window.confirm("¿Eliminar esta tarea?")) return;
    try {
      await deleteTask(task._id);
      toast.success("Tarea eliminada");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al eliminar");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "short",
    });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card-hover p-4 group"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-200 truncate text-sm">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3">
            <StatusBadge status={task.status} />
            {task.createdAt && (
              <span className="text-xs text-slate-600">
                {formatDate(task.createdAt)}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => navigate(`/tasks/${task._id}/edit`)}
            className="p-1.5 rounded-lg transition-all duration-200"
            style={{ color: "#64748b" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(99,102,241,0.15)";
              e.currentTarget.style.color = "#818cf8";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#64748b";
            }}
            title="Editar"
          >
            <Pencil size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg transition-all duration-200"
            style={{ color: "#64748b" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(239,68,68,0.12)";
              e.currentTarget.style.color = "#f87171";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#64748b";
            }}
            title="Eliminar"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
