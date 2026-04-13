import axios from 'axios';

// ✅ API URL (Vercel env)

const API_URL = import.meta.env.VITE_API_URL || "https://aurum-perfume-16.onrender.com/";
// 🚨 Fail fast if env missing
if (!API_URL) {
  throw new Error("❌ VITE_API_URL is not defined. Set it in Vercel environment variables.");
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // ✅ important for auth/cookies
});

// =======================
// ✅ Attach token helper
// =======================
const getToken = () => localStorage.getItem('aurumToken');

// =======================
// ✅ Request interceptor
// =======================
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =======================
// ✅ Response interceptor
// =======================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('aurumToken');
      localStorage.removeItem('aurumUser');

      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }

    // Better debugging
    console.error("API Error:", error.response || error.message);

    return Promise.reject(error);
  }
);

// =======================
// ✅ PRODUCT APIs
// =======================
export const productAPI = {
  getAll: async (params) => {
    const res = await api.get('/products', { params });
    return res.data;
  },
  getById: (id) => api.get(`/products/${id}`),
  getBestSellers: () => api.get('/products/best-sellers'),
  getNewArrivals: () => api.get('/products/new-arrivals'),
  getFeatured: () => api.get('/products/featured'),
  getCategories: () => api.get('/products/categories'),
  getByCategory: (category) => api.get(`/products/category/${category}`),
};

// =======================
// ✅ USER APIs
// =======================
export const userAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  googleLogin: (credential) => api.post('/users/google', { credential }),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  changePassword: (data) => api.put('/users/change-password', data),
};

// =======================
// ✅ ORDER APIs
// =======================
export const orderAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getById: (id) => api.get(`/orders/${id}`),
  cancel: (id) => api.put(`/orders/${id}/cancel`),
  updatePayment: (id, data) => api.put(`/orders/${id}/pay`, data),
};

// =======================
// ✅ PAYMENT APIs
// =======================
export const paymentAPI = {
  createOrder: (data) => api.post('/payment/create-order', data),
  verifyPayment: (data) => api.post('/payment/verify', data),
  getKey: () => api.get('/payment/key'),
};

// =======================
// ✅ CONTACT APIs
// =======================
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
};

export default api;
