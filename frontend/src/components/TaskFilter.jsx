import { STATUS_OPTIONS } from "../utils/statusHelpers";

/**
 * Client-side status filter bar. Calls onChange with the selected status string
 * or empty string for "all".
 */
export default function TaskFilter({ value, onChange }) {
  const btnClass = (active) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      active
        ? "bg-indigo-600 text-white"
        : "bg-slate-700 text-slate-300 hover:bg-slate-600"
    }`;

  return (
    <div className="flex gap-2 flex-wrap">
      <button onClick={() => onChange("")} className={btnClass(value === "")}>
        Todas
      </button>
      {STATUS_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={btnClass(value === opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
