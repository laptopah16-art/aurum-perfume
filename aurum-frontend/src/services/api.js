import axios from 'axios';

// ✅ Production API URL (from Vercel env)
const API_URL = import.meta.env.VITE_API_URL;

// 🚨 Safety check (optional but helpful)
if (!API_URL) {
  console.error("❌ VITE_API_URL is not defined in environment variables");
}

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Initialize axios defaults with token if exists
const initAxiosDefaults = () => {
  const token = localStorage.getItem('aurumToken');
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
};

// Call on load
initAxiosDefaults();

// Request interceptor - attach token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('aurumToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('aurumToken');
      localStorage.removeItem('aurumUser');

      // Redirect to login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);


// =======================
// ✅ PRODUCT APIs
// =======================
export const productAPI = {
  getAll: async (params) => {
    const response = await api.get('/products', { params });
    return response.data;
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
