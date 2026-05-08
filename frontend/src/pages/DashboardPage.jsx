import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  BarChart3,
  ListTodo,
  ArrowRight,
  TrendingUp,
  Circle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";

const STAT_CONFIG = [
  {
    key: "total",
    label: "Total tareas",
    icon: ListTodo,
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.08)",
    border: "rgba(148,163,184,0.15)",
  },
  {
    key: "pendiente",
    label: "Pendientes",
    icon: Circle,
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.08)",
    border: "rgba(245,158,11,0.2)",
  },
  {
    key: "en progreso",
    label: "En progreso",
    icon: Clock,
    color: "#818cf8",
    bg: "rgba(99,102,241,0.1)",
    border: "rgba(99,102,241,0.2)",
  },
  {
    key: "completada",
    label: "Completadas",
    icon: CheckCircle,
    color: "#4ade80",
    bg: "rgba(34,197,94,0.08)",
    border: "rgba(34,197,94,0.2)",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function DashboardPage() {
  const { user } = useAuth();
  const { tasks, loading, fetchTasks } = useTasks();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const counts = {
    total: tasks.length,
    pendiente: tasks.filter((t) => t.status === "pendiente").length,
    "en progreso": tasks.filter((t) => t.status === "en progreso").length,
    completada: tasks.filter((t) => t.status === "completada").length,
  };

  const completionRate =
    counts.total > 0 ? Math.round((counts.completada / counts.total) * 100) : 0;

  const recent = [...tasks].reverse().slice(0, 6);

  return (
    <MainLayout>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Stat cards */}
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
            {STAT_CONFIG.map(
              ({ key, label, icon: Icon, color, bg, border }) => (
                <motion.div
                  key={key}
                  variants={item}
                  className="glass-card p-5 flex flex-col gap-3"
                  style={{ borderColor: border }}
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
                      {label}
                    </p>
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: bg }}
                    >
                      <Icon size={16} style={{ color }} />
                    </div>
                  </div>
                  <p
                    className="text-4xl font-bold leading-none"
                    style={{ color }}
                  >
                    {key === "total" ? counts.total : counts[key]}
                  </p>
                </motion.div>
              ),
            )}
          </div>

          {/* Main content grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* Recent tasks – takes 2/3 */}
            <motion.div variants={item} className="xl:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-slate-200">
                    Actividad reciente
                  </h2>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full"
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
                  to="/tasks"
                  className="flex items-center gap-1 text-xs font-medium transition-colors"
                  style={{ color: "#F59E0B" }}
                >
                  Ver tablero
                  <ArrowRight size={12} />
                </Link>
              </div>

              {recent.length === 0 ? (
                <div
                  className="glass-card p-10 text-center"
                  style={{ borderStyle: "dashed" }}
                >
                  <ListTodo size={28} className="text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm mb-4">
                    No tienes tareas todavía
                  </p>
                  <Link to="/tasks/new" className="btn-gold text-sm px-5 py-2">
                    Crear primera tarea
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recent.map((task, i) => (
                    <motion.div
                      key={task._id}
                      variants={item}
                      className="glass-card-hover flex items-center gap-4 px-4 py-3"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-200 truncate">
                          {task.title}
                        </p>
                        {task.description && (
                          <p className="text-xs text-slate-500 truncate mt-0.5">
                            {task.description}
                          </p>
                        )}
                      </div>
                      <StatusBadge status={task.status} />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Sidebar widgets – 1/3 */}
            <div className="space-y-4">
              {/* Progress widget */}
              <motion.div variants={item} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp size={15} style={{ color: "#F59E0B" }} />
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Progreso
                  </p>
                </div>

                <div className="flex items-end gap-3 mb-4">
                  <span
                    className="text-5xl font-bold leading-none"
                    style={{ color: "#F59E0B" }}
                  >
                    {completionRate}
                  </span>
                  <span className="text-slate-500 text-lg mb-1">%</span>
                </div>
                <p className="text-xs text-slate-500 mb-3">
                  completado del total
                </p>

                {/* Progress bar */}
                <div
                  className="w-full h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.06)" }}
                >
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #F59E0B, #FBBF24)",
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${completionRate}%` }}
                    transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
              </motion.div>

              {/* Mini breakdown */}
              <motion.div variants={item} className="glass-card p-5">
                <div className="flex items-center gap-2 mb-4">
                  <BarChart3 size={15} style={{ color: "#818cf8" }} />
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                    Desglose
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    { label: "Pendiente", key: "pendiente", color: "#F59E0B" },
                    {
                      label: "En Progreso",
                      key: "en progreso",
                      color: "#818cf8",
                    },
                    {
                      label: "Completada",
                      key: "completada",
                      color: "#4ade80",
                    },
                  ].map(({ label, key, color }) => {
                    const val = counts[key];
                    const pct =
                      counts.total > 0
                        ? Math.round((val / counts.total) * 100)
                        : 0;
                    return (
                      <div key={key}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-slate-400">{label}</span>
                          <span style={{ color }} className="font-semibold">
                            {val}
                          </span>
                        </div>
                        <div
                          className="w-full h-1 rounded-full overflow-hidden"
                          style={{ background: "rgba(255,255,255,0.05)" }}
                        >
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: color }}
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{
                              duration: 0.6,
                              delay: 0.4,
                              ease: "easeOut",
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>

              {/* Quick action */}
              <motion.div variants={item}>
                <Link
                  to="/tasks/new"
                  className="glass-card-hover flex items-center justify-between p-4 group"
                >
                  <span className="text-sm font-medium text-slate-300 group-hover:text-slate-100 transition-colors">
                    Nueva tarea
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(245,158,11,0.15)" }}
                  >
                    <ArrowRight
                      size={14}
                      style={{ color: "#F59E0B" }}
                      className="group-hover:translate-x-0.5 transition-transform"
                    />
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </MainLayout>
  );
}
