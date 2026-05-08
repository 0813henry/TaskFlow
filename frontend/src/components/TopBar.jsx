import { useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const PAGE_TITLES = {
  "/dashboard": { title: "Dashboard", sub: "Bienvenido de vuelta" },
  "/tasks": { title: "Mis Tareas", sub: "Gestiona tu flujo de trabajo" },
  "/tasks/new": { title: "Nueva Tarea", sub: "Crea una nueva tarea" },
};

export default function TopBar() {
  const location = useLocation();
  const { user } = useAuth();

  const isEditPage = location.pathname.includes("/edit");
  const pageKey = isEditPage
    ? "/tasks/new"
    : Object.keys(PAGE_TITLES).find((k) =>
        k === "/dashboard"
          ? location.pathname === "/dashboard"
          : k === "/tasks/new"
            ? location.pathname === "/tasks/new"
            : location.pathname.startsWith(k),
      );

  const page = PAGE_TITLES[pageKey] ?? { title: "TaskFlow", sub: "" };

  return (
    <header
      className="h-16 flex items-center justify-between px-6 shrink-0"
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(11, 15, 25, 0.8)",
        backdropFilter: "blur(12px)",
      }}
    >
      {/* Page title */}
      <div>
        <h1 className="text-base font-semibold text-slate-100">{page.title}</h1>
        {page.sub && (
          <p className="text-xs text-slate-500">
            {page.sub}
            {page.title === "Dashboard" && user?.nombre
              ? `, ${user.nombre}!`
              : ""}
          </p>
        )}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div
          className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            color: "#64748b",
          }}
        >
          <Search size={14} />
          <span className="text-xs">Buscar...</span>
          <kbd
            className="ml-2 text-xs px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(255,255,255,0.06)",
              color: "#475569",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            ⌘K
          </kbd>
        </div>

        {/* Notification bell */}
        <button
          className="relative w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-200"
          style={{ background: "rgba(255,255,255,0.04)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.08)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.04)")
          }
        >
          <Bell size={16} className="text-slate-400" />
          <span
            className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
            style={{ background: "#F59E0B" }}
          />
        </button>

        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold cursor-pointer"
          style={{
            background: "linear-gradient(135deg, #6366F1, #4f46e5)",
            color: "#fff",
            border: "2px solid rgba(99, 102, 241, 0.3)",
          }}
        >
          {user?.nombre?.charAt(0)?.toUpperCase() ?? "U"}
        </div>
      </div>
    </header>
  );
}
