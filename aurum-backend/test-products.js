const axios = require('axios');

async function testProducts() {
  try {
    console.log('Testing products API...');
    const response = await axios.get('http://localhost:5000/api/products');
    console.log('Products API Success!');
    console.log('Count:', response.data.count);
    console.log('First 8 products:');
    response.data.data.slice(0, 8).forEach((p, i) => {
      console.log(`${i+1}. ${p.name} - $${p.price}`);
    });
  } catch (error) {
    console.log('Products Error:', error.response?.data || error.message);
  }
}

testProducts();

