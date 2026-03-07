const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Import Product model
const Product = require('../models/Product');

// Import products data
const products = require('../data/products');

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Seed products function
const seedProducts = async () => {
  try {
    await connectDB();

    // Check if products already exist
    const existingProducts = await Product.countDocuments();
    
    if (existingProducts > 0) {
      console.log(`✓ Database already has ${existingProducts} products. Skipping seed.`);
    } else {
      // Insert products
      await Product.insertMany(products);
      console.log('✓ Successfully seeded 8 products!');
    }

    await mongoose.connection.close();
    console.log('✓ Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error.message);
    process.exit(1);
  }
};

// Run the seeder
seedProducts();

