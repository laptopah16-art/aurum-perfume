// Test API script
const axios = require('axios');

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
  try {
    // Test health endpoint
    console.log('Testing /api/health...');
    const health = await axios.get(`${API_URL}/health`);
    console.log('Health:', health.data);
    
    // Test login endpoint
    console.log('\nTesting /api/users/login...');
    try {
      const login = await axios.post(`${API_URL}/users/login`, {
        email: 'admin@aurum.com',
        password: 'admin123'
      });
      console.log('Login success:', login.data);
    } catch (err) {
      console.log('Login error:', err.response?.data || err.message);
    }
    
    // Test products endpoint
    console.log('\nTesting /api/products...');
    const products = await axios.get(`${API_URL}/products`);
    console.log('Products count:', products.data.count);
    console.log('Products:', products.data.data?.slice(0, 2) || 'No products');
    
  } catch (error) {
    console.error('Error:', error.message);
    if (error.response) {
      console.error('Response:', error.response.data);
    }
  }
}

testAPI();

