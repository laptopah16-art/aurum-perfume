import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AdminAuthContext';
import AdminLayout from './AdminLayout';

const ProtectedRoute = () => {
  const { admin, loading } = useAuth();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-yellow-500 text-lg">Loading...</span>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!admin) {
    return <Navigate to="/admin/login" replace />;
  }

  // Render protected content with AdminLayout
  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
};

export default ProtectedRoute;

