const User = require('../models/User');

// Admin middleware - check if user is admin
const admin = async (req, res, next) => {
  try {
    // First check if user exists (should be set by authMiddleware)
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized',
      });
    }

    // Check if user is admin
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Access denied. Admin privileges required.',
      });
    }

    next();
  } catch (error) {
    console.error('Admin middleware error:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Server error in admin middleware',
    });
  }
};

module.exports = { admin };

