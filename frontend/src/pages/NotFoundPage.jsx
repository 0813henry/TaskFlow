import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Zap } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ background: "#0B0F19" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(245,158,11,0.07) 0%, transparent 70%)",
        }}
      />
      <motion.div
        className="text-center relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 justify-center mb-12">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
          >
            <Zap size={16} fill="currentColor" style={{ color: "#0B0F19" }} />
          </div>
          <span className="text-lg font-bold" style={{ color: "#F59E0B" }}>
            TaskFlow
          </span>
        </div>

        <p
          className="text-9xl font-black leading-none mb-4"
          style={{
            background:
              "linear-gradient(135deg, #F59E0B 0%, #D97706 50%, rgba(245,158,11,0.3) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </p>
        <h1 className="text-2xl font-bold text-slate-100 mb-2">
          Página no encontrada
        </h1>
        <p className="text-slate-500 mb-8">
          La ruta que buscas no existe o fue eliminada.
        </p>
        <Link
          to="/dashboard"
          className="btn-gold inline-flex items-center gap-2"
        >
          <ArrowLeft size={15} />
          Volver al inicio
        </Link>
      </motion.div>
    </div>
  );
}
