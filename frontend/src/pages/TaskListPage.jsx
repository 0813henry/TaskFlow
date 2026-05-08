import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTasks } from "../context/TaskContext";
import MainLayout from "../layouts/MainLayout";
import TaskCard from "../components/TaskCard";
import TaskFilter from "../components/TaskFilter";
import LoadingSpinner from "../components/LoadingSpinner";

export default function TaskListPage() {
  const { tasks, loading, fetchTasks } = useTasks();
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Client-side filtering for snappy UX (no extra API call needed)
  const filtered = filterStatus
    ? tasks.filter((t) => t.status === filterStatus)
    : tasks;

  return (
    <MainLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-100">Mis tareas</h1>
            <p className="text-slate-400 text-sm mt-1">
              {filtered.length} tarea{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            to="/tasks/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            + Nueva tarea
          </Link>
        </div>

        {/* Status filter */}
        <TaskFilter value={filterStatus} onChange={setFilterStatus} />

        {/* Task list */}
        {loading ? (
          <LoadingSpinner />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 bg-slate-800 rounded-xl border border-slate-700">
            <p className="text-slate-400 text-lg">
              {filterStatus
                ? `No hay tareas con estado "${filterStatus}"`
                : "No tienes tareas todavía"}
            </p>
            {!filterStatus && (
              <Link
                to="/tasks/new"
                className="inline-block mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
              >
                Crear primera tarea
              </Link>
            )}
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
