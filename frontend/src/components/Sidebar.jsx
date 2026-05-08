import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  CheckSquare,
  PlusCircle,
  LogOut,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/tasks", label: "Mis Tareas", icon: CheckSquare },
  { to: "/tasks/new", label: "Nueva Tarea", icon: PlusCircle },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 top-0 h-full w-60 flex flex-col z-40"
      style={{
        background: "rgba(9, 13, 25, 0.95)",
        backdropFilter: "blur(20px)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-6 flex items-center gap-3">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
        >
          <Zap size={16} className="text-bg-primary" fill="currentColor" />
        </div>
        <span
          className="text-lg font-bold tracking-tight"
          style={{ color: "#F59E0B" }}
        >
          TaskFlow
        </span>
      </div>

      {/* Divider */}
      <div
        className="mx-4 mb-4"
        style={{ height: "1px", background: "rgba(255,255,255,0.05)" }}
      />

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-widest text-slate-600">
          Menú
        </p>
        {NAV_ITEMS.map(({ to, label, icon: Icon }) => {
          const active =
            to === "/dashboard"
              ? location.pathname === "/dashboard"
              : location.pathname.startsWith(to) &&
                !(to === "/tasks" && location.pathname.includes("/new")) &&
                !(to === "/tasks" && location.pathname.includes("/edit"));
          const isNew = to === "/tasks/new";
          const isActiveNew =
            location.pathname === "/tasks/new" ||
            location.pathname.includes("/edit");

          const isActive = isNew ? isActiveNew : active;

          return (
            <Link
              key={to}
              to={to}
              className={`sidebar-item ${isActive ? "sidebar-item-active" : ""}`}
            >
              <Icon size={17} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div
        className="p-3 m-3 rounded-xl"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
            style={{
              background: "linear-gradient(135deg, #6366F1, #4f46e5)",
              color: "#fff",
            }}
          >
            {user?.nombre?.charAt(0)?.toUpperCase() ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-200 truncate">
              {user?.nombre ?? "Usuario"}
            </p>
            <p className="text-xs text-slate-500 truncate">
              {user?.email ?? ""}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={14} />
          <span>Cerrar sesión</span>
        </button>
      </div>
    </motion.aside>
  );
}
