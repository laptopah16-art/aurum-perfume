const axios = require('axios');

async function testLogin() {
  try {
    console.log('Testing admin login...');
    const response = await axios.post('http://localhost:5000/api/users/login', {
      email: 'admin@aurum.com',
      password: 'admin123'
    });
    console.log('Login Success!');
    console.log('User:', response.data.data.name);
    console.log('Role:', response.data.data.role);
    console.log('Token:', response.data.data.token ? 'Token received' : 'No token');
  } catch (error) {
    console.log('Login Error:', error.response?.data || error.message);
  }
}

testLogin();

