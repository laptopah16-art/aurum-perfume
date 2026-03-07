// Auth helper functions

const TOKEN_KEY = 'aurumToken';
const USER_KEY = 'aurumUser';

export const authService = {
  // Save token and user to localStorage
  saveAuth: (token, user) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  // Get token from localStorage
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  // Get user from localStorage
  getUser: () => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem(TOKEN_KEY);
  },

  // Check if user is admin
  isAdmin: () => {
    const user = authService.getUser();
    return user?.role === 'admin';
  },

  // Logout - clear all auth data
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

export default authService;

