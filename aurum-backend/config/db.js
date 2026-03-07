const mongoose = require('mongoose');

let isConnected = false;

/**
 * Connect to MongoDB with retry logic
 */
const connectDB = async () => {
  // If already connected, don't reconnect
  if (isConnected) {
    console.log('✓ MongoDB already connected');
    return mongoose.connection;
  }

  // Get MongoDB URI from environment or use default local MongoDB
  const mongoURI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aurum_perfume';

  // Ensure the URI includes a database name to avoid connecting to the default "test" database
  // Examples:
  //   mongodb+srv://user:pass@cluster.mongodb.net/aurum_perfume?retryWrites=true&w=majority
  //   mongodb://127.0.0.1:27017/aurum_perfume
  const missingDbName = /mongodb(\+srv)?:\/\/[^\s/]+\/\?(.*)?$/i.test(mongoURI) || /mongodb(\+srv)?:\/\/[^\s/]+\/?$/i.test(mongoURI);
  if (missingDbName) {
    throw new Error(
      'MongoDB Connection Failed: database name missing in MONGO_URI. ' +
        'Please set MONGO_URI like: mongodb+srv://<user>:<pass>@<cluster>.mongodb.net/aurum_perfume?retryWrites=true&w=majority'
    );
  }
  
  console.log('Attempting to connect to MongoDB...');
  console.log('MongoDB URI:', mongoURI.replace(/\/\/.*:.*@/, '//****:****@')); // Hide credentials

  // Connection options with better timeouts
  const options = {
    serverSelectionTimeoutMS: 10000, // 10 seconds to select server
    socketTimeoutMS: 45000, // 45 seconds for socket timeout
    maxPoolSize: 10, // Maximum number of connections
    minPoolSize: 1,  // Minimum number of connections
  };

  // Retry logic with exponential backoff
  const maxRetries = 5;
  const baseDelay = 1000; // 1 second

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Connection attempt ${attempt} of ${maxRetries}...`);
      
      const conn = await mongoose.connect(mongoURI, options);
      
      isConnected = true;
      console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
      console.log(`✓ Database: ${conn.connection.name}`);
      
      // Handle connection events
      mongoose.connection.on('error', (err) => {
        console.error('MongoDB Connection Failed:', err.message);
        isConnected = false;
      });
      
      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB disconnected');
        isConnected = false;
      });
      
      mongoose.connection.on('reconnected', () => {
        console.log('MongoDB reconnected');
        isConnected = true;
      });

      // Return the connection
      return conn;
      
    } catch (error) {
      console.error(`MongoDB Connection Failed (attempt ${attempt}):`, error.message);
      
      if (attempt === maxRetries) {
        console.error('✗ Max retries reached. Could not connect to MongoDB.');
        console.error('Please make sure:');
        console.error('  1. MongoDB is running locally (mongod) OR');
        console.error('  2. Your MONGO_URI in .env is correct');
        throw error;
      }
      
      // Exponential backoff: wait before retrying
      const delay = baseDelay * Math.pow(2, attempt - 1);
      console.log(`Retrying in ${delay/1000} seconds...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
};

/**
 * Check if MongoDB is connected
 */
const isDBConnected = () => {
  return mongoose.connection.readyState === 1;
};

/**
 * Get mongoose connection
 */
const getConnection = () => {
  return mongoose.connection;
};

module.exports = { connectDB, isDBConnected, getConnection };

