const express = require('express');
const router = express.Router();
const {
  createRazorpayOrder,
  verifyPayment,
  getRazorpayKey,
} = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

// Public route - get Razorpay key
router.get('/key', getRazorpayKey);

// Protected routes - create and verify payment
router.post('/create-order', protect, createRazorpayOrder);
router.post('/verify', protect, verifyPayment);

module.exports = router;

