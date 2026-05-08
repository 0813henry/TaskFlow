import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../context/TaskContext";
import MainLayout from "../layouts/MainLayout";
import LoadingSpinner from "../components/LoadingSpinner";
import StatusBadge from "../components/StatusBadge";

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

  const recent = tasks.slice(0, 5);

  const stats = [
    {
      label: "Total",
      value: counts.total,
      color: "text-slate-100",
      bg: "bg-slate-800 border-slate-700",
    },
    {
      label: "Pendientes",
      value: counts.pendiente,
      color: "text-yellow-300",
      bg: "bg-yellow-500/10 border-yellow-500/20",
    },
    {
      label: "En Progreso",
      value: counts["en progreso"],
      color: "text-blue-300",
      bg: "bg-blue-500/10 border-blue-500/20",
    },
    {
      label: "Completadas",
      value: counts.completada,
      color: "text-green-300",
      bg: "bg-green-500/10 border-green-500/20",
    },
  ];

  return (
    <MainLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-100">
            Hola, <span className="text-indigo-400">{user?.nombre}</span> 👋
          </h1>
          <p className="text-slate-400 mt-1">
            Aquí tienes un resumen de tus tareas
          </p>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : (
          <>
            {/* Stats grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map(({ label, value, color, bg }) => (
                <div key={label} className={`${bg} border rounded-xl p-4`}>
                  <p className="text-slate-400 text-sm">{label}</p>
                  <p className={`text-3xl font-bold mt-1 ${color}`}>{value}</p>
                </div>
              ))}
            </div>

            {/* Recent tasks */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-slate-100">
                  Tareas recientes
                </h2>
                <Link
                  to="/tasks"
                  className="text-indigo-400 hover:text-indigo-300 text-sm"
                >
                  Ver todas →
                </Link>
              </div>

              {recent.length === 0 ? (
                <div className="text-center py-12 bg-slate-800 rounded-xl border border-slate-700">
                  <p className="text-slate-400">No tienes tareas todavía.</p>
                  <Link
                    to="/tasks/new"
                    className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
                  >
                    Crear primera tarea
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recent.map((task) => (
                    <div
                      key={task._id}
                      className="flex items-center gap-3 bg-slate-800 border border-slate-700 rounded-xl p-3 hover:border-indigo-500/40 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-slate-100 text-sm font-medium truncate">
                          {task.title}
                        </p>
                      </div>
                      <StatusBadge status={task.status} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </MainLayout>
  );
}
