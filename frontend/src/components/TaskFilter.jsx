import { STATUS_OPTIONS } from "../utils/statusHelpers";

const FILTER_COLORS = {
  "": {
    color: "#94a3b8",
    bg: "rgba(148,163,184,0.1)",
    border: "rgba(148,163,184,0.2)",
  },
  pendiente: {
    color: "#F59E0B",
    bg: "rgba(245,158,11,0.1)",
    border: "rgba(245,158,11,0.25)",
  },
  "en progreso": {
    color: "#818cf8",
    bg: "rgba(99,102,241,0.12)",
    border: "rgba(99,102,241,0.25)",
  },
  completada: {
    color: "#4ade80",
    bg: "rgba(34,197,94,0.1)",
    border: "rgba(34,197,94,0.2)",
  },
};

export default function TaskFilter({ value, onChange }) {
  const ALL = [{ value: "", label: "Todas" }, ...STATUS_OPTIONS];

  return (
    <div className="flex gap-2 flex-wrap">
      {ALL.map((opt) => {
        const active = value === opt.value;
        const conf = FILTER_COLORS[opt.value] ?? FILTER_COLORS[""];
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200"
            style={{
              background: active ? conf.bg : "rgba(255,255,255,0.04)",
              color: active ? conf.color : "#64748b",
              border: `1px solid ${active ? conf.border : "rgba(255,255,255,0.07)"}`,
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
