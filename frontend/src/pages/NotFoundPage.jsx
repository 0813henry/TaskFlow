import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4">
      <div className="text-center">
        <p className="text-8xl font-bold text-indigo-500 opacity-30">404</p>
        <h1 className="text-2xl font-bold text-slate-100 mt-4">
          Página no encontrada
        </h1>
        <p className="text-slate-400 mt-2">La ruta que buscas no existe.</p>
        <Link
          to="/dashboard"
          className="inline-block mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
