import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const AdminAuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AdminAuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AdminAuthProvider");
  }

  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check saved login on mount
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      const userStr = localStorage.getItem("adminUser");

      if (token && userStr) {
        try {
          const parsedUser = JSON.parse(userStr);

          if (parsedUser.role === "admin") {
            // Set axios default header
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAdmin(parsedUser);
          } else {
            // Not admin, clear storage
            localStorage.removeItem("adminToken");
            localStorage.removeItem("adminUser");
          }
        } catch (error) {
          console.error("Auth parse error:", error);
          localStorage.removeItem("adminToken");
          localStorage.removeItem("adminUser");
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // LOGIN - Fixed to handle API response correctly
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });

      const data = response.data;

      if (!data.success) {
        throw new Error(data.message || "Login failed");
      }

      const user = data.data;

      // Verify user has admin role
      if (user.role !== "admin") {
        throw new Error("Admin access only. This account is not an admin.");
      }

      // Store token and user - ensure token is stored
      const token = user.token || data.token;
      if (!token) {
        throw new Error("No token received from server");
      }

      localStorage.setItem("adminToken", token);
      localStorage.setItem("adminUser", JSON.stringify(user));

      // Set axios default header
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setAdmin(user);

      return { success: true, user };
    } catch (error) {
      console.error("Login error:", error);
      
      // Handle different error scenarios
      if (error.response) {
        // Server responded with error
        const message = error.response.data?.message || "Login failed";
        throw new Error(message);
      } else if (error.request) {
        // No response received
        throw new Error("Unable to connect to server. Please ensure backend is running on port 5000.");
      } else {
        throw new Error(error.message || "Login failed");
      }
    }
  };

  // LOGOUT
  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    delete axios.defaults.headers.common["Authorization"];
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        admin,
        login,
        logout,
        loading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};
