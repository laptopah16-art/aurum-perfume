const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');
const { 
  createContactMessage, 
  getAllContactMessages 
} = require('../controllers/contactController');

// Public route - anyone can submit a contact message
router.post('/', createContactMessage);

// Protected admin route - only admin can view all messages
router.get('/', protect, admin, getAllContactMessages);

module.exports = router;

