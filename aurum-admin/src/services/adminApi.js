import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Create axios instance with default config (for authenticated requests)
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Create a public axios instance (no auth header)
const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle response errors for authenticated API
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// ============ PUBLIC PRODUCT APIs (No Auth Required) ============
// Used for reading products - GET /api/products is public
export const publicProductAPI = {
  // Get all products (public endpoint - no auth required)
  getAll: async () => {
    try {
      const response = await publicApi.get('/products');
      // Handle response format: { success, count, data: [...] }
      const data = response.data;
      if (data.success && data.data) {
        return data;
      }
      // Fallback if response is directly the array
      return { success: true, data: data.data || data, count: data.count || (Array.isArray(data) ? data.length : 0) };
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get single product (public endpoint - no auth required)
  getById: async (id) => {
    try {
      const response = await publicApi.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },
};

// ============ AUTHENTICATED PRODUCT APIs (Auth Required) ============
// Used for create, update, delete operations
export const productAPI = {
  // Get all products (with auth - returns full details)
  getAll: async () => {
    try {
      const response = await api.get('/products');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get product by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Create new product
  create: async (productData) => {
    try {
      const response = await api.post('/products', productData);
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  },

  // Update product
  update: async (id, productData) => {
    try {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  // Delete product
  delete: async (id) => {
    try {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

// ============ ORDER APIs ============
export const orderAPI = {
  // Get all orders
  getAll: async () => {
    try {
      const response = await api.get('/orders');
      return response.data;
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  },

  // Get order by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  },

  // Update order status
  updateStatus: async (id, status) => {
    try {
      const response = await api.put(`/orders/${id}/status`, { orderStatus: status });
      return response.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  },
};

// ============ USER APIs ============
export const userAPI = {
  // Get all users
  getAll: async () => {
    try {
      const response = await api.get('/users');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Admin login
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/users/login`, {
        email,
        password,
      });
      // Return full response data so caller can check success flag
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },
};

export default {
  publicProductAPI,
  productAPI,
  orderAPI,
  userAPI,
};

