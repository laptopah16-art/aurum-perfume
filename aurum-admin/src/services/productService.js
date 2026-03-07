import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all products
export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/products`, getAuthHeader());
  return response.data;
};

// Get product by ID
export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/products/${id}`, getAuthHeader());
  return response.data;
};

// Create new product
export const createProduct = async (productData) => {
  const response = await axios.post(
    `${API_URL}/products`,
    productData,
    getAuthHeader()
  );
  return response.data;
};

// Update product
export const updateProduct = async (id, productData) => {
  const response = await axios.put(
    `${API_URL}/products/${id}`,
    productData,
    getAuthHeader()
  );
  return response.data;
};

// Delete product
export const deleteProduct = async (id) => {
  const response = await axios.delete(
    `${API_URL}/products/${id}`,
    getAuthHeader()
  );
  return response.data;
};

// Get all contact messages
export const getContactMessages = async () => {
  const response = await axios.get(`${API_URL}/contact`, getAuthHeader());
  return response.data;
};

// Export productAPI with getContactMessages method for compatibility
export const productAPI = {
  getContactMessages,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getContactMessages,
  productAPI,
};

