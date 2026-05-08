/**
 * Single source of truth for task status display configuration.
 * Used by StatusBadge, TaskFilter, and TaskFormPage.
 */
export const STATUS_CONFIG = {
  pendiente: {
    label: "Pendiente",
    color: "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30",
    dot: "bg-yellow-400",
  },
  "en progreso": {
    label: "En Progreso",
    color: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
    dot: "bg-blue-400",
  },
  completada: {
    label: "Completada",
    color: "bg-green-500/20 text-green-300 border border-green-500/30",
    dot: "bg-green-400",
  },
};

export const STATUS_OPTIONS = Object.entries(STATUS_CONFIG).map(
  ([value, config]) => ({
    value,
    label: config.label,
  }),
);

/** @param {string} status @returns {typeof STATUS_CONFIG[keyof STATUS_CONFIG]} */
export const getStatusConfig = (status) =>
  STATUS_CONFIG[status] || {
    label: status,
    color: "bg-slate-700 text-slate-300 border border-slate-600",
    dot: "bg-slate-400",
  };
