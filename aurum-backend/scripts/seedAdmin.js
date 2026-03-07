/**
 * Admin User Seed Script
 * 
 * This script creates an admin user if one doesn't exist.
 * Run: node scripts/seedAdmin.js
 */

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env'), override: true });
const mongoose = require('mongoose');
const User = require('../models/User');
const { connectDB } = require('../config/db');

async function seedAdmin() {
  console.log('========================================');
  console.log('AURUM Admin User Seeder');
  console.log('========================================');
  console.log('Connecting to MongoDB...');
  
  try {
    await connectDB();
    
    const adminEmail = 'admin@aurum.com';
    const adminPassword = 'admin123';
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: adminEmail }).select('+password');
    
    if (existingAdmin) {
      if (existingAdmin.role === 'admin') {
        console.log('Admin already exists');
      } else {
        existingAdmin.role = 'admin';
        existingAdmin.password = adminPassword;
        await existingAdmin.save();
        console.log('Admin user verified');
      }
    } else {
      // Create new admin user
      const adminUser = new User({
        name: 'Admin',
        email: adminEmail,
        password: adminPassword,
        role: 'admin',
      });
      
      await adminUser.save();
      console.log('Admin user verified');
    }
    
    console.log('========================================');
    console.log('Admin Credentials:');
    console.log(`  Email: ${adminEmail}`);
    console.log(`  Password: ${adminPassword}`);
    console.log('========================================');
    
    await mongoose.connection.close();
    console.log('✓ Database connection closed');
    process.exit(0);
    
  } catch (error) {
    console.error('========================================');
    console.error('✗ Error:', error.message);
    console.error('========================================');
    
    if (error.message.includes('MongoDB')) {
      console.log('\nPlease ensure:');
      console.log('  1. MongoDB is running (mongod)');
      console.log('  2. Or set correct MONGO_URI in .env');
    }
    
    process.exit(1);
  }
}

// Run the seeder
seedAdmin();

