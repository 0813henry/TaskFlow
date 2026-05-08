import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Circle, Clock, CheckCircle, GripVertical } from "lucide-react";
import { useTasks } from "../context/TaskContext";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";
import toast from "react-hot-toast";

const COLUMNS = [
  {
    status: "pendiente",
    label: "Pendiente",
    icon: Circle,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.15)",
    headerBg: "rgba(245,158,11,0.1)",
  },
  {
    status: "en progreso",
    label: "En Progreso",
    icon: Clock,
    color: "#818cf8",
    bg: "rgba(99,102,241,0.06)",
    border: "rgba(99,102,241,0.15)",
    headerBg: "rgba(99,102,241,0.1)",
  },
  {
    status: "completada",
    label: "Completada",
    icon: CheckCircle,
    color: "#4ade80",
    bg: "rgba(34,197,94,0.05)",
    border: "rgba(34,197,94,0.15)",
    headerBg: "rgba(34,197,94,0.08)",
  },
];

function KanbanCard({ task, onDragStart }) {
  const { updateTask, deleteTask } = useTasks();
  const [showActions, setShowActions] = useState(false);

  const handleDelete = async () => {
    if (!confirm("¿Eliminar esta tarea?")) return;
    try {
      await deleteTask(task._id);
      toast.success("Tarea eliminada");
    } catch {
      toast.error("Error al eliminar");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      draggable
      onDragStart={(e) => onDragStart(e, task._id)}
      className="glass-card-hover p-4 cursor-grab active:cursor-grabbing select-none group"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex items-start gap-2">
        <GripVertical
          size={14}
          className="text-slate-600 mt-0.5 shrink-0 group-hover:text-slate-400 transition-colors"
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-200 leading-snug">
            {task.title}
          </p>
          {task.description && (
            <p className="text-xs text-slate-500 mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showActions && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2 mt-3 pt-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
          >
            <Link
              to={`/tasks/${task._id}/edit`}
              className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200"
              style={{
                background: "rgba(99,102,241,0.12)",
                color: "#818cf8",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              Editar
            </Link>
            <button
              onClick={handleDelete}
              className="text-xs px-2.5 py-1 rounded-lg font-medium transition-all duration-200"
              style={{
                background: "rgba(239,68,68,0.08)",
                color: "#f87171",
                border: "1px solid rgba(239,68,68,0.15)",
              }}
            >
              Eliminar
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TaskListPage() {
  const { tasks, loading, fetchTasks, updateTask } = useTasks();
  const [dragOverCol, setDragOverCol] = useState(null);
  const draggedId = useRef(null);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const getColTasks = (status) => tasks.filter((t) => t.status === status);

  const handleDragStart = (e, id) => {
    draggedId.current = id;
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e, status) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverCol(status);
  };

  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    setDragOverCol(null);
    const id = draggedId.current;
    if (!id) return;
    const task = tasks.find((t) => t._id === id);
    if (!task || task.status === newStatus) return;
    try {
      await updateTask(id, { ...task, status: newStatus });
      toast.success(`Movida a "${newStatus}"`);
    } catch {
      toast.error("Error al actualizar");
    }
    draggedId.current = null;
  };

  const handleDragLeave = () => setDragOverCol(null);

  return (
    <MainLayout>
      <div className="flex flex-col h-full gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-slate-200">
              Tablero Kanban
            </h1>
            <span
              className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{
                background: "rgba(245,158,11,0.1)",
                color: "#F59E0B",
                border: "1px solid rgba(245,158,11,0.2)",
              }}
            >
              {tasks.length} tareas
            </span>
          </div>
          <Link
            to="/tasks/new"
            className="btn-gold flex items-center gap-1.5 text-sm px-4 py-2"
          >
            <Plus size={15} />
            Nueva tarea
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1">
            {COLUMNS.map(
              ({ status, label, icon: Icon, color, bg, border, headerBg }) => {
                const colTasks = getColTasks(status);
                const isOver = dragOverCol === status;

                return (
                  <div
                    key={status}
                    className="flex flex-col rounded-2xl overflow-hidden transition-all duration-200"
                    style={{
                      background: isOver
                        ? `rgba(${
                            color === "#F59E0B"
                              ? "245,158,11"
                              : color === "#818cf8"
                                ? "99,102,241"
                                : "34,197,94"
                          },0.04)`
                        : bg,
                      border: `1px solid ${isOver ? color : border}`,
                      boxShadow: isOver ? `0 0 20px ${color}20` : undefined,
                    }}
                    onDragOver={(e) => handleDragOver(e, status)}
                    onDrop={(e) => handleDrop(e, status)}
                    onDragLeave={handleDragLeave}
                  >
                    {/* Column header */}
                    <div
                      className="px-4 py-3 flex items-center justify-between"
                      style={{
                        background: headerBg,
                        borderBottom: `1px solid ${border}`,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon size={14} style={{ color }} />
                        <span
                          className="text-xs font-semibold uppercase tracking-wider"
                          style={{ color }}
                        >
                          {label}
                        </span>
                      </div>
                      <span
                        className="text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                        style={{
                          background: `${color}20`,
                          color,
                        }}
                      >
                        {colTasks.length}
                      </span>
                    </div>

                    {/* Cards */}
                    <div className="flex-1 p-3 space-y-2 overflow-y-auto">
                      <AnimatePresence>
                        {colTasks.length === 0 ? (
                          <div className="py-8 text-center">
                            <p className="text-xs text-slate-600">
                              Sin tareas aquí
                            </p>
                            <p className="text-xs text-slate-700 mt-1">
                              Arrastra una tarjeta
                            </p>
                          </div>
                        ) : (
                          colTasks.map((task) => (
                            <KanbanCard
                              key={task._id}
                              task={task}
                              onDragStart={handleDragStart}
                            />
                          ))
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              },
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
