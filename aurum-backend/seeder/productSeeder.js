const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') });

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

// Import Product model
const Product = require('../models/Product');

// Products data - matching the Product model schema
const products = [
  {
    name: 'Noir Absolu',
    brand: 'AURUM',
    price: 285,
    originalPrice: 340,
    category: 'luxury',
    fragranceType: 'oriental',
    size: '100ml',
    description: 'A deep, mysterious fragrance with notes of amber, vanilla, and precious woods. Noir Absolu embodies the essence of midnight luxury.',
    rating: 4.9,
    reviews: 312,
    isBestSeller: true,
    countInStock: 50,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
  },
  {
    name: 'Or Blanc',
    brand: 'AURUM',
    price: 220,
    category: 'women',
    fragranceType: 'floral',
    size: '75ml',
    description: 'An elegant floral fragrance featuring jasmine, rose, and lily of the valley. Or Blanc captures the purity of white flowers.',
    rating: 4.8,
    reviews: 204,
    isBestSeller: true,
    countInStock: 75,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
  },
  {
    name: 'Aqua Regale',
    brand: 'AURUM',
    price: 175,
    category: 'women',
    fragranceType: 'fresh',
    size: '100ml',
    description: 'A refreshing aquatic scent with sea notes, citrus, and soft musk. Perfect for summer days.',
    rating: 4.7,
    reviews: 189,
    countInStock: 60,
    image: 'https://images.unsplash.com/photo-1523293188086-b431e93f9afb?w=800',
  },
  {
    name: 'Obsidian',
    brand: 'AURUM',
    price: 260,
    category: 'men',
    fragranceType: 'woody',
    size: '100ml',
    description: 'A powerful woody fragrance with sandalwood, cedar, and patchouli. Bold and sophisticated.',
    rating: 4.9,
    reviews: 267,
    isBestSeller: true,
    countInStock: 45,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
  },
  {
    name: 'Lumière Éternelle',
    brand: 'AURUM',
    price: 195,
    category: 'luxury',
    fragranceType: 'floral',
    size: '50ml',
    description: 'A luminous floral fragrance with tuberose, ylang-ylang, and warm amber. Radiant and timeless.',
    rating: 4.8,
    reviews: 156,
    isNewArrival: true,
    countInStock: 40,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800',
  },
  {
    name: 'Ambre Mystique',
    brand: 'AURUM',
    price: 310,
    category: 'luxury',
    fragranceType: 'oriental',
    size: '100ml',
    description: 'An opulent oriental fragrance with rare amber, frankincense, and myrrh. Pure luxury in a bottle.',
    rating: 5.0,
    reviews: 98,
    isNewArrival: true,
    countInStock: 30,
    image: 'https://images.unsplash.com/photo-1608041690656-3e9b5b3a6c2c?w=800',
  },
  {
    name: 'Rosé Imperial',
    brand: 'AURUM',
    price: 240,
    category: 'women',
    fragranceType: 'floral',
    size: '75ml',
    description: 'A luxurious rose fragrance with Turkish rose, peony, and soft cashmere. Fit for royalty.',
    rating: 4.7,
    reviews: 143,
    isNewArrival: true,
    countInStock: 55,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800',
  },
  {
    name: 'Oud Sauvage',
    brand: 'AURUM',
    price: 350,
    category: 'men',
    fragranceType: 'woody',
    size: '100ml',
    description: 'An intense oud fragrance with agarwood, leather, and spice. Wild and unforgettable.',
    rating: 4.9,
    reviews: 211,
    isBestSeller: true,
    countInStock: 35,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
  },
];

// Seed products function
const seedProducts = async () => {
  try {
    await connectDB();

    // Clear existing products to avoid duplicates
    await Product.deleteMany({});
    console.log('✓ Cleared existing products');

    // Insert products
    await Product.insertMany(products);

    console.log('8 products inserted successfully');

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error.message);
    process.exit(1);
  }
};

// Run the seeder
seedProducts();

