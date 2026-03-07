const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');

// Initialize Razorpay instance with validation
const initializeRazorpay = () => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_SECRET;

  if (!keyId || !keySecret) {
    console.error('⚠️  Razorpay credentials are not configured. Payment functionality will not work.');
    return null;
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });
};

const razorpay = initializeRazorpay();

// @desc    Create Razorpay order
// @route   POST /api/payment/create-order
// @access  Private
const createRazorpayOrder = async (req, res) => {
  try {
    // Check if Razorpay is initialized
    if (!razorpay) {
      console.error('Razorpay not initialized - missing credentials');
      return res.status(503).json({
        success: false,
        message: 'Payment service is not configured. Please contact administrator.',
        code: 'PAYMENT_NOT_CONFIGURED',
      });
    }

    const { amount, currency = 'INR' } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount. Please provide a valid order amount.',
        code: 'INVALID_AMOUNT',
      });
    }

    // Validate amount is a number
    if (isNaN(parseFloat(amount))) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be a valid number.',
        code: 'INVALID_AMOUNT_FORMAT',
      });
    }

    // Create order in Razorpay
    const options = {
      amount: Math.round(amount * 100), // Razorpay expects amount in paise (multiply by 100)
      currency,
      receipt: `order_${Date.now()}`,
      payment_capture: 1, // Auto-capture payment
    };

    console.log('Creating Razorpay order with amount:', options.amount, 'currency:', currency);

    const razorpayOrder = await razorpay.orders.create(options);

    console.log('Razorpay order created successfully:', razorpayOrder.id);

    res.status(200).json({
      success: true,
      data: {
        orderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error('Create Razorpay order error:', error);
    
    // Provide specific error messages based on error type
    let errorMessage = 'Failed to create payment order. Please try again.';
    let errorCode = 'PAYMENT_ERROR';

    if (error.message && error.message.includes('invalid')) {
      errorMessage = 'Invalid Razorpay credentials. Please contact administrator.';
      errorCode = 'INVALID_CREDENTIALS';
    } else if (error.message && error.message.includes('network')) {
      errorMessage = 'Network error. Please check your internet connection and try again.';
      errorCode = 'NETWORK_ERROR';
    }

    res.status(500).json({
      success: false,
      message: errorMessage,
      code: errorCode,
      error: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
};

// @desc    Verify Razorpay payment
// @route   POST /api/payment/verify
// @access  Private
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature, orderId } = req.body;

    if (!razorpay_payment_id || !razorpay_order_id || !razorpay_signature || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification details',
      });
    }

    // Verify signature
    const signatureData = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_SECRET)
      .update(signatureData)
      .digest('hex');

    if (razorpay_signature !== expectedSignature) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment signature',
      });
    }

    // Find and update the order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',
      });
    }

    // Update order payment status
    order.isPaid = true;
    order.paidAt = Date.now();
    order.orderStatus = 'processing';
    order.paymentMethod = 'razorpay';
    order.paymentResult = {
      id: razorpay_payment_id,
      status: 'completed',
      razorpayOrderId: razorpay_order_id,
      email: req.user?.email || '',
    };

    await order.save();

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      data: {
        orderId: order._id,
        paymentId: razorpay_payment_id,
        orderStatus: order.orderStatus,
      },
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Payment verification failed',
    });
  }
};

// @desc    Get Razorpay key for frontend
// @route   GET /api/payment/key
// @access  Public
const getRazorpayKey = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: {
        keyId: process.env.RAZORPAY_KEY_ID,
      },
    });
  } catch (error) {
    console.error('Get Razorpay key error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get payment key',
    });
  }
};

module.exports = {
  createRazorpayOrder,
  verifyPayment,
  getRazorpayKey,
};

