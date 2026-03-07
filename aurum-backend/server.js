const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env'), override: true });

// Create Express app
const app = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - Allow frontend (ports 5173-5177) and admin panel
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:5175',
    'http://localhost:5175',
    'http://localhost:5176',
    'http://localhost:5177',
    'http://127.0.0.1:5173',
    'http://127.0.0.1:5174',
    'http://127.0.0.1:5175',
    'http://127.0.0.1:5175',
    'http://127.0.0.1:5176',
    'http://127.0.0.1:5177'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const contactRoutes = require('./routes/contactRoutes');

// Health check endpoint (before routes to ensure it's always available)
app.get('/api/health', (req, res) => {
  const dbState = mongoose.connection.readyState;
  const dbStatus = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting'
  };
  
  res.json({ 
    status: 'ok', 
    message: 'AURUM Backend API is running',
    database: dbStatus[dbState] || 'unknown'
  });
});

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Welcome to AURUM Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      products: '/api/products',
      users: '/api/users',
      orders: '/api/orders'
    }
  });
});

// Start server function
const startServer = async () => {
  try {
    // Connect to MongoDB first - wait for connection before starting server
    console.log('========================================');
    console.log('Starting AURUM Backend Server...');
    console.log('========================================');

    await connectDB();
    console.log('✓ Database connection established');
    
    // Mount routes
    app.use('/api/products', productRoutes);
    app.use('/api/users', userRoutes);
    app.use('/api/orders', orderRoutes);
    app.use('/api/payment', paymentRoutes);
    app.use('/api/contact', contactRoutes);
    
    console.log('✓ Routes mounted successfully');
    
    // Error handling middleware
    app.use((err, req, res, next) => {
      console.error(err.stack);
      res.status(500).json({
        success: false,
        message: err.message || 'Server Error',
      });
    });

    // 404 handler
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        message: 'Route not found',
      });
    });

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log('========================================');
      console.log(`✓ Server running on port ${PORT}`);
      console.log(`✓ Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('========================================');
      
      // Auto-seed products after server starts
      autoSeedProducts();
      
      // Auto-seed admin user
      autoSeedAdmin();
    });
    
  } catch (error) {
    console.error('========================================');
    console.error('✗ Failed to start server:', error.message);
    console.error('========================================');
    process.exit(1);
  }
};

// Auto-seed products function
const autoSeedProducts = async () => {
  // Check if MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    console.log('⚠️  MongoDB not connected. Skipping auto-seed.');
    return;
  }
  
  try {
    const Product = require('./models/Product');
    const count = await Product.countDocuments();
    
    if (count === 0) {
      console.log('No products found. Auto-seeding...');
      
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

      await Product.insertMany(products);
      console.log('✓ Auto-seeded 8 products successfully!');
    } else {
      console.log(`✓ Database already has ${count} products.`);
    }
  } catch (error) {
    console.error('Auto-seed error:', error.message);
  }
};

// Auto-seed admin user
const autoSeedAdmin = async () => {
  // Check if MongoDB is connected
  if (mongoose.connection.readyState !== 1) {
    console.log('⚠️  MongoDB not connected. Skipping admin seed.');
    return;
  }
  
  try {
    const User = require('./models/User');
    const bcrypt = require('bcryptjs');
    
    const adminEmail = 'admin@aurum.com';
    const adminPassword = 'admin123';
    
    // Check if admin exists
    const adminExists = await User.findOne({ email: adminEmail, role: 'admin' });

    if (adminExists) {
      console.log('✓ Admin user already exists');
    } else {
      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(adminPassword, salt);

      // Create admin user
      const adminUser = new User({
        name: 'Admin',
        email: adminEmail,
        password: hashedPassword,
        role: 'admin',
      });

      await adminUser.save();
      console.log('✓ Admin user created successfully!');
      console.log('  Email: admin@aurum.com');
      console.log('  Password: admin123');
    }
  } catch (error) {
    console.error('Admin seed error:', error.message);
  }
};

// Start the server
startServer();

module.exports = app;

