import { useNavigate } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import StatusBadge from "./StatusBadge";
import toast from "react-hot-toast";

/**
 * Card displaying a single task with edit/delete actions.
 * Actions appear on hover.
 */
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
      year: "numeric",
    });

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 hover:border-indigo-500/50 transition-colors group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-slate-100 truncate">
            {task.title}
          </h3>
          {task.description && (
            <p className="text-sm text-slate-400 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-3 mt-3">
            <StatusBadge status={task.status} />
            <span className="text-xs text-slate-500">
              {formatDate(task.createdAt)}
            </span>
          </div>
        </div>

        {/* Actions — visible on hover */}
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
          <button
            onClick={() => navigate(`/tasks/${task._id}/edit`)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-slate-700 transition-colors"
            title="Editar"
          >
            ✎
          </button>
          <button
            onClick={handleDelete}
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-slate-700 transition-colors"
            title="Eliminar"
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
