import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8faf8] dark:bg-[#0a120a]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2e7d32] to-[#4caf50] flex items-center justify-center shadow-lg animate-pulse">
            <span className="text-2xl">👑</span>
          </div>
          <div className="w-6 h-6 border-2 border-[#4caf50]/30 border-t-[#4caf50] rounded-full animate-spin" />
          <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">Verifying Admin Access...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}
