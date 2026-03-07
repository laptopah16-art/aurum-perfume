import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AdminAuthProvider, useAuth } from "./context/AdminAuthContext";

// Import components
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import Analytics from "./pages/Analytics";
import Coupons from "./pages/Coupons";
import Settings from "./pages/Settings";
import ContactMessages from "./pages/ContactMessages";

const PublicRoute = ({ children }) => {
  const { admin, loading } = useAuth();

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

  if (admin) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Routes>

          {/* LOGIN */}
          <Route
            path="/admin/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          {/* ADMIN ROUTES */}
          <Route path="/admin" element={<ProtectedRoute />}>

            <Route index element={<Navigate to="dashboard" replace />} />

            <Route path="dashboard" element={<Dashboard />} />

            <Route path="products" element={<Products />} />
            <Route path="products/add" element={<AddProduct />} />
            <Route path="products/edit/:id" element={<EditProduct />} />

            <Route path="orders" element={<Orders />} />

            <Route path="users" element={<Customers />} />
            <Route path="customers" element={<Customers />} />

            <Route path="analytics" element={<Analytics />} />

            <Route path="coupons" element={<Coupons />} />

            <Route path="settings" element={<Settings />} />

            <Route path="messages" element={<ContactMessages />} />

          </Route>

          {/* ROOT */}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

          {/* 404 */}
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />

        </Routes>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;