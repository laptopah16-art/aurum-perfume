const Product = require('../models/Product');
const mongoose = require('mongoose');

const allowDegradedMode = String(process.env.ALLOW_DEGRADED_MODE || '').toLowerCase() === 'true';

const sampleProducts = [
  {
    _id: 'sample-1',
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
    isNew: false,
    isNewArrival: false,
    countInStock: 50,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800',
    createdAt: new Date('2024-01-01T00:00:00.000Z'),
  },
  {
    _id: 'sample-2',
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
    isNew: false,
    isNewArrival: false,
    countInStock: 75,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800',
    createdAt: new Date('2024-01-02T00:00:00.000Z'),
  },
  {
    _id: 'sample-3',
    name: 'Aqua Regale',
    brand: 'AURUM',
    price: 175,
    category: 'women',
    fragranceType: 'fresh',
    size: '100ml',
    description: 'A refreshing aquatic scent with sea notes, citrus, and soft musk. Perfect for summer days.',
    rating: 4.7,
    reviews: 189,
    isBestSeller: false,
    isNew: false,
    isNewArrival: false,
    countInStock: 60,
    image: 'https://images.unsplash.com/photo-1523293188086-b431e93f9afb?w=800',
    createdAt: new Date('2024-01-03T00:00:00.000Z'),
  },
  {
    _id: 'sample-4',
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
    isNew: false,
    isNewArrival: false,
    countInStock: 45,
    image: 'https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=800',
    createdAt: new Date('2024-01-04T00:00:00.000Z'),
  },
  {
    _id: 'sample-5',
    name: 'Lumière Éternelle',
    brand: 'AURUM',
    price: 195,
    category: 'luxury',
    fragranceType: 'floral',
    size: '50ml',
    description: 'A luminous floral fragrance with tuberose, ylang-ylang, and warm amber. Radiant and timeless.',
    rating: 4.8,
    reviews: 156,
    isBestSeller: false,
    isNew: true,
    isNewArrival: true,
    countInStock: 40,
    image: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800',
    createdAt: new Date('2024-02-01T00:00:00.000Z'),
  },
  {
    _id: 'sample-6',
    name: 'Ambre Mystique',
    brand: 'AURUM',
    price: 310,
    category: 'luxury',
    fragranceType: 'oriental',
    size: '100ml',
    description: 'An opulent oriental fragrance with rare amber, frankincense, and myrrh. Pure luxury in a bottle.',
    rating: 5.0,
    reviews: 98,
    isBestSeller: false,
    isNew: true,
    isNewArrival: true,
    countInStock: 30,
    image: 'https://images.unsplash.com/photo-1608041690656-3e9b5b3a6c2c?w=800',
    createdAt: new Date('2024-02-02T00:00:00.000Z'),
  },
  {
    _id: 'sample-7',
    name: 'Rosé Imperial',
    brand: 'AURUM',
    price: 240,
    category: 'women',
    fragranceType: 'floral',
    size: '75ml',
    description: 'A luxurious rose fragrance with Turkish rose, peony, and soft cashmere. Fit for royalty.',
    rating: 4.7,
    reviews: 143,
    isBestSeller: false,
    isNew: true,
    isNewArrival: true,
    countInStock: 55,
    image: 'https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800',
    createdAt: new Date('2024-02-03T00:00:00.000Z'),
  },
  {
    _id: 'sample-8',
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
    isNew: false,
    isNewArrival: false,
    countInStock: 35,
    image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800',
    createdAt: new Date('2024-01-10T00:00:00.000Z'),
  },
];

const getFilteredSampleProducts = (queryParams) => {
  const {
    category,
    brand,
    fragranceType,
    minPrice,
    maxPrice,
    isBestSeller,
    isNew,
    search,
  } = queryParams;

  let result = [...sampleProducts];

  if (category) result = result.filter((p) => p.category === category);
  if (brand) result = result.filter((p) => p.brand === brand);
  if (fragranceType) result = result.filter((p) => p.fragranceType === fragranceType);
  if (minPrice) result = result.filter((p) => p.price >= Number(minPrice));
  if (maxPrice) result = result.filter((p) => p.price <= Number(maxPrice));
  if (isBestSeller === 'true') result = result.filter((p) => p.isBestSeller);
  if (isNew === 'true') result = result.filter((p) => p.isNew);
  if (search) {
    const s = String(search).toLowerCase();
    result = result.filter((p) => {
      return (
        String(p.name).toLowerCase().includes(s) ||
        String(p.brand).toLowerCase().includes(s) ||
        String(p.description).toLowerCase().includes(s)
      );
    });
  }

  return result;
};

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 20, 
      category, 
      brand, 
      fragranceType,
      minPrice,
      maxPrice,
      isBestSeller,
      isNew,
      search,
      sort = '-createdAt'
    } = req.query;

    if (allowDegradedMode && mongoose.connection.readyState !== 1) {
      const all = getFilteredSampleProducts(req.query);
      const pageNum = Number(page);
      const limitNum = Number(limit);
      const start = (pageNum - 1) * limitNum;
      const paged = all.slice(start, start + limitNum);

      return res.json({
        success: true,
        count: all.length,
        totalPages: Math.ceil(all.length / limitNum),
        currentPage: pageNum,
        data: paged,
      });
    }

    // Build query
    let query = {};

    if (category) {
      query.category = category;
    }
    if (brand) {
      query.brand = brand;
    }
    if (fragranceType) {
      query.fragranceType = fragranceType;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (isBestSeller === 'true') {
      query.isBestSeller = true;
    }
    if (isNew === 'true') {
      query.isNew = true;
    }
    if (search) {
      query.$text = { $search: search };
    }

    // Execute query with pagination
    const products = await Product.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await Product.countDocuments(query);

    res.json({
      success: true,
      count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      data: products,
    });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    if (allowDegradedMode && mongoose.connection.readyState !== 1) {
      const product = sampleProducts.find((p) => String(p._id) === String(req.params.id));

      if (!product) {
        return res.status(404).json({
          success: false,
          message: 'Product not found',
        });
      }

      return res.json({
        success: true,
        data: product,
      });
    }

    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Create new product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const productData = {
      ...req.body,
    };

    // Handle image upload
    if (req.file) {
      productData.image = `/uploads/${req.file.filename}`;
    }

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product,
    });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Handle image upload
    const updateData = { ...req.body };
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Delete product error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get best sellers
// @route   GET /api/products/best-sellers
// @access  Public
const getBestSellers = async (req, res) => {
  try {
    if (allowDegradedMode && mongoose.connection.readyState !== 1) {
      const products = sampleProducts.filter((p) => p.isBestSeller).slice(0, 10);

      return res.json({
        success: true,
        count: products.length,
        data: products,
      });
    }

    const products = await Product.find({ isBestSeller: true }).limit(10);

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Get best sellers error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
// @access  Public
const getNewArrivals = async (req, res) => {
  try {
    if (allowDegradedMode && mongoose.connection.readyState !== 1) {
      const products = sampleProducts
        .filter((p) => p.isNew || p.isNewArrival)
        .sort((a, b) => Number(b.createdAt) - Number(a.createdAt))
        .slice(0, 10);

      return res.json({
        success: true,
        count: products.length,
        data: products,
      });
    }

    const products = await Product.find({ isNew: true }).sort('-createdAt').limit(10);

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Get new arrivals error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
const getFeaturedProducts = async (req, res) => {
  try {
    if (allowDegradedMode && mongoose.connection.readyState !== 1) {
      const products = sampleProducts.slice(0, 10);

      return res.json({
        success: true,
        count: products.length,
        data: products,
      });
    }

    const products = await Product.find({ isFeatured: true }).limit(10);

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Get featured products error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
const getCategories = async (req, res) => {
  try {
    if (allowDegradedMode && mongoose.connection.readyState !== 1) {
      const categoryToCount = new Map();
      for (const p of sampleProducts) {
        categoryToCount.set(p.category, (categoryToCount.get(p.category) || 0) + 1);
      }
      const data = Array.from(categoryToCount.entries()).map(([name, count]) => ({ name, count }));

      return res.json({
        success: true,
        data,
      });
    }

    const categories = await Product.distinct('category');
    const categoriesWithCount = await Promise.all(
      categories.map(async (category) => {
        const count = await Product.countDocuments({ category });
        return { name: category, count };
      })
    );

    res.json({
      success: true,
      data: categoriesWithCount,
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get products by category
// @route   GET /api/products/category/:category
// @access  Public
const getProductsByCategory = async (req, res) => {
  try {
    if (allowDegradedMode && mongoose.connection.readyState !== 1) {
      const products = sampleProducts.filter((p) => p.category === req.params.category);

      return res.json({
        success: true,
        count: products.length,
        data: products,
      });
    }

    const products = await Product.find({ category: req.params.category });

    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error('Get products by category error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Upload product image
// @route   POST /api/products/upload
// @access  Private/Admin
const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file',
      });
    }

    res.json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: `/uploads/${req.file.filename}`,
      },
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBestSellers,
  getNewArrivals,
  getFeaturedProducts,
  getCategories,
  getProductsByCategory,
  uploadProductImage,
};

