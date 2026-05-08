import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Zap } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const { register, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      await login({ email: form.email, password: form.password });
      toast.success("¡Cuenta creada exitosamente!");
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error al registrar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ background: "#0B0F19" }}>
      {/* Left – Branding panel */}
      <div
        className="hidden lg:flex flex-col justify-between w-1/2 p-12 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(145deg, #0f1624 0%, #0B0F19 60%, #0d1220 100%)",
          borderRight: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(99,102,241,0.12) 0%, transparent 65%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at center, rgba(245,158,11,0.1) 0%, transparent 65%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="flex items-center gap-3 relative z-10">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
          >
            <Zap size={18} className="text-bg-primary" fill="currentColor" />
          </div>
          <span className="text-xl font-bold" style={{ color: "#F59E0B" }}>
            TaskFlow
          </span>
        </div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h2 className="text-4xl font-bold leading-tight text-slate-100 mb-4">
            Empieza gratis.
            <br />
            <span style={{ color: "#F59E0B" }}>Sin límites.</span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
            Crea tu cuenta en segundos y comienza a organizar tus proyectos con
            claridad total.
          </p>

          <div className="flex flex-wrap gap-2 mt-8">
            {["Sin tarjeta", "Setup en 30s", "100% gratis"].map((feat) => (
              <span
                key={feat}
                className="px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(245,158,11,0.1)",
                  color: "#F59E0B",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
              >
                {feat}
              </span>
            ))}
          </div>
        </motion.div>

        <p className="text-slate-600 text-xs relative z-10">
          © 2024 TaskFlow · Diseñado para equipos modernos
        </p>
      </div>

      {/* Right – Form panel */}
      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div
          className="w-full max-w-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #F59E0B, #D97706)",
              }}
            >
              <Zap size={16} fill="currentColor" className="text-bg-primary" />
            </div>
            <span className="text-xl font-bold" style={{ color: "#F59E0B" }}>
              TaskFlow
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-100">Crear cuenta</h1>
            <p className="text-slate-500 mt-1 text-sm">
              Únete a TaskFlow hoy mismo
            </p>
          </div>

          <div className="glass-card p-7">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="reg-nombre"
                  className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider"
                >
                  Nombre
                </label>
                <div className="relative">
                  <User
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                  <input
                    id="reg-nombre"
                    type="text"
                    name="nombre"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                    placeholder="Tu nombre"
                    className="input-glass pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="tu@email.com"
                    className="input-glass pl-9"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">
                  Contraseña
                </label>
                <div className="relative">
                  <Lock
                    size={15}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none"
                  />
                  <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                    minLength={6}
                    placeholder="Mínimo 6 caracteres"
                    className="input-glass pl-9"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-gold w-full flex items-center justify-center gap-2 mt-2"
              >
                {loading ? "Creando cuenta..." : "Crear cuenta"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>
          </div>

          <p className="text-center text-slate-500 text-sm mt-6">
            ¿Ya tienes cuenta?{" "}
            <Link
              to="/login"
              className="font-semibold transition-colors"
              style={{ color: "#F59E0B" }}
              onMouseEnter={(e) => (e.target.style.color = "#FBBF24")}
              onMouseLeave={(e) => (e.target.style.color = "#F59E0B")}
            >
              Inicia sesión
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
