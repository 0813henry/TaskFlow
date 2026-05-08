import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Sesión cerrada");
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-4 py-3">
      <div className="container mx-auto max-w-5xl flex items-center justify-between">
        <Link
          to="/dashboard"
          className="text-xl font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          TaskFlow
        </Link>

        <div className="flex items-center gap-4">
          <Link
            to="/tasks"
            className="text-slate-300 hover:text-white transition-colors text-sm"
          >
            Tareas
          </Link>
          <Link
            to="/tasks/new"
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-1.5 rounded-lg transition-colors"
          >
            + Nueva
          </Link>
          <span className="text-slate-400 text-sm hidden sm:block">
            {user?.nombre}
          </span>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-400 text-sm transition-colors"
          >
            Salir
          </button>
        </div>
      </div>
    </nav>
  );
}
