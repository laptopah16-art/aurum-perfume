const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/aurum';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('✓ MongoDB Connected');

    const adminEmail = 'admin@aurum.com';
    const adminPassword = 'admin123';

    // Check if admin exists
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log('✓ Admin user already exists');
      console.log('Email:', adminEmail);
      console.log('Role:', adminExists.role);
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
      console.log('Email:', adminEmail);
      console.log('Password:', adminPassword);
      console.log('Role: admin');
    }

    await mongoose.connection.close();
    console.log('✓ Database connection closed.');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

createAdmin();

