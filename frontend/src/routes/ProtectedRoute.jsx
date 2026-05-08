import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoadingSpinner from "../components/LoadingSpinner";

/**
 * Wraps protected pages. Redirects to /login if unauthenticated.
 * Shows a spinner while the auth state is being restored from localStorage.
 */
export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;
  return user ? children : <Navigate to="/login" replace />;
}
