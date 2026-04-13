const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters'],
  },
  brand: {
    type: String,
    required: [true, 'Please provide brand name'],
    default: 'AURUM',
  },
  category: {
    type: String,
    required: [true, 'Please specify category'],
    enum: ['luxury', 'men', 'women', 'unisex', 'signature'],
  },
  fragranceType: {
    type: String,
    required: [true, 'Please specify fragrance type'],
    enum: ['oriental', 'floral', 'fresh', 'woody', 'citrus', 'spicy', 'Eau de Parfum', 'Eau de Toilette', 'Parfum', 'Cologne', 'Perfume', 'Extrait de Parfum'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide price'],
    min: [0, 'Price cannot be negative'],
  },
  originalPrice: {
    type: Number,
    default: null,
  },
  description: {
    type: String,
    required: [true, 'Please provide description'],
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot exceed 200 characters'],
  },
  size: {
    type: String,
    default: '100ml',
  },
  fragranceNotes: {
    top: [{
      type: String,
    }],
    middle: [{
      type: String,
    }],
    base: [{
      type: String,
    }],
  },
  image: {
    type: String,
    default: '',
  },
  images: [{
    type: String,
  }],
  countInStock: {
    type: Number,
    default: 50,
    min: [0, 'Stock cannot be negative'],
  },
  rating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot exceed 5'],
  },
  reviews: {
    type: Number,
    default: 0,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for searching
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

module.exports = mongoose.model('Product', productSchema);
