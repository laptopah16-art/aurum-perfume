const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

// Load environment variables
dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ MongoDB Connected...');
  } catch (error) {
    console.error('MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

// Your exact 15 products
const products = [
  // 🔥 LUXURY (5)
  {
    id: '1',
    name: 'Noir Absolu',
    brand: 'AURUM',
    price: 285,
    originalPrice: 340,
    image: 'https://i.pinimg.com/1200x/ed/a4/c5/eda4c5db6129cf401645e2beed3f69d7.jpg',
    category: 'luxury',
    fragranceType: 'oriental',
    size: '100ml',
    rating: 4.9,
    reviews: 312,
    shortDescription: 'A dark, smoky oriental with golden oud and black amber.',
    description: 'A deep luxurious scent blending oud, amber, and spices.',
    topNotes: ['Black Pepper', 'Saffron', 'Bergamot'],
    middleNotes: ['Oud', 'Rose', 'Jasmine'],
    baseNotes: ['Amber', 'Sandalwood', 'Musk', 'Vanilla'],
    isBestSeller: true,
    isNew: false,
  },
  {
    id: '2',
    name: 'Velvet Orchid',
    brand: 'AURUM',
    price: 295,
    image: 'https://i.pinimg.com/736x/ac/3d/83/ac3d83af69b6f464d57ce3344a975ea9.jpg',
    category: 'luxury',
    fragranceType: 'floral',
    size: '90ml',
    rating: 4.9,
    reviews: 187,
    shortDescription: 'Rich orchid with chocolate and patchouli.',
    description: 'A sensual and luxurious floral fragrance.',
    topNotes: ['Orchid', 'Plum', 'Truffle'],
    middleNotes: ['Chocolate', 'Patchouli'],
    baseNotes: ['Vanilla', 'Amber'],
    isBestSeller: true,
    isNew: false,
  },
  {
    id: '3',
    name: 'Ambre Mystique',
    brand: 'AURUM',
    price: 310,
    image: 'https://i.pinimg.com/webp/736x/21/d3/47/21d3474f88c53b8d54a372f2582c30e6.webp',
    category: 'luxury',
    fragranceType: 'oriental',
    size: '100ml',
    rating: 5.0,
    reviews: 98,
    shortDescription: 'Rare amber inspired by Silk Road.',
    description: 'Warm, rich and long-lasting amber scent.',
    topNotes: ['Cardamom', 'Cinnamon'],
    middleNotes: ['Rose', 'Oud'],
    baseNotes: ['Amber', 'Vanilla'],
    isBestSeller: false,
    isNew: true,
  },
  {
    id: '4',
    name: 'Lumière Éternelle',
    brand: 'AURUM',
    price: 195,
    image: 'https://i.pinimg.com/736x/a7/08/9c/a7089cf8b8f8b35f8d8dfe760cd6ffef.jpg',
    category: 'luxury',
    fragranceType: 'floral',
    size: '50ml',
    rating: 4.8,
    reviews: 156,
    shortDescription: 'Soft luminous floral elegance.',
    description: 'A bright and graceful floral perfume.',
    topNotes: ['Bergamot', 'Neroli'],
    middleNotes: ['Rose', 'Iris'],
    baseNotes: ['Musk', 'Wood'],
    isBestSeller: false,
    isNew: true,
  },
  {
    id: '5',
    name: 'Golden Oud Reserve',
    brand: 'AURUM',
    price: 380,
    image: 'https://i.pinimg.com/736x/d8/8d/47/d88d4796dc78d4e19853cfbc5f83d399.jpg',
    category: 'luxury',
    fragranceType: 'woody',
    size: '100ml',
    rating: 4.9,
    reviews: 120,
    shortDescription: 'Premium aged oud fragrance.',
    description: 'An intense woody and luxurious oud scent.',
    topNotes: ['Oud', 'Spices'],
    middleNotes: ['Wood', 'Rose'],
    baseNotes: ['Amber', 'Musk'],
    isBestSeller: true,
    isNew: false,
  },

  // 🔥 MEN (5)
  {
    id: '6',
    name: 'Obsidian',
    brand: 'AURUM',
    price: 260,
    image: 'https://i.pinimg.com/736x/d4/37/e7/d437e7ae0d2141c4852cbca3153e5a98.jpg',
    category: 'men',
    fragranceType: 'woody',
    size: '100ml',
    rating: 4.9,
    reviews: 267,
    shortDescription: 'Dark leather and smoked wood.',
    description: 'Strong masculine fragrance with smoky depth.',
    topNotes: ['Pepper', 'Vetiver'],
    middleNotes: ['Leather', 'Cedar'],
    baseNotes: ['Amber', 'Oakmoss'],
    isBestSeller: true,
    isNew: false,
  },
  {
    id: '7',
    name: 'Oud Sauvage',
    brand: 'AURUM',
    price: 350,
    image: 'https://i.pinimg.com/736x/54/e3/c7/54e3c7710e921b35589fe1c172b0b6a3.jpg',
    category: 'men',
    fragranceType: 'woody',
    size: '100ml',
    rating: 4.9,
    reviews: 211,
    shortDescription: 'Wild and raw oud experience.',
    description: 'A powerful and bold oud fragrance.',
    topNotes: ['Bergamot'],
    middleNotes: ['Oud', 'Rose'],
    baseNotes: ['Musk', 'Amber'],
    isBestSeller: true,
    isNew: false,
  },
  {
    id: '8',
    name: 'Midnight Leather',
    brand: 'AURUM',
    price: 275,
    image: 'https://i.pinimg.com/736x/11/35/30/1135303eb129020d1f9ab429e09e5145.jpg',
    category: 'men',
    fragranceType: 'oriental',
    size: '100ml',
    rating: 4.7,
    reviews: 150,
    shortDescription: 'Smooth leather and spices.',
    description: 'Elegant night fragrance.',
    topNotes: ['Spices'],
    middleNotes: ['Leather'],
    baseNotes: ['Amber'],
    isBestSeller: false,
    isNew: true,
  },
  {
    id: '9',
    name: 'Royal Vetiver',
    brand: 'AURUM',
    price: 230,
    image: 'https://i.pinimg.com/736x/6a/94/d3/6a94d3624c5b12798dc62c6d16e7baaa.jpg',
    category: 'men',
    fragranceType: 'fresh',
    size: '100ml',
    rating: 4.6,
    reviews: 132,
    shortDescription: 'Fresh and clean vetiver.',
    description: 'A refreshing everyday scent.',
    topNotes: ['Lemon'],
    middleNotes: ['Vetiver'],
    baseNotes: ['Musk'],
    isBestSeller: false,
    isNew: false,
  },
  {
    id: '10',
    name: 'Dark Ember',
    brand: 'AURUM',
    price: 290,
    image: 'https://i.pinimg.com/736x/18/fd/ae/18fdae4b53ca8d0fd9687aa15ec467cb.jpg',
    category: 'men',
    fragranceType: 'oriental',
    size: '100ml',
    rating: 4.8,
    reviews: 140,
    shortDescription: 'Warm smoky embers.',
    description: 'Deep and intense scent.',
    topNotes: ['Pepper'],
    middleNotes: ['Smoke'],
    baseNotes: ['Amber'],
    isBestSeller: true,
    isNew: false,
  },

  // 🔥 WOMEN (5)
  {
    id: '11',
    name: 'Or Blanc',
    brand: 'AURUM',
    price: 220,
    image: 'https://i.pinimg.com/736x/b4/72/59/b472592242438f4034a7b41a393f7a26.jpg',
    category: 'women',
    fragranceType: 'floral',
    size: '75ml',
    rating: 4.8,
    reviews: 204,
    shortDescription: 'Elegant white floral scent.',
    description: 'Soft feminine fragrance.',
    topNotes: ['Peach'],
    middleNotes: ['Gardenia'],
    baseNotes: ['Musk'],
    isBestSeller: true,
    isNew: false,
  },
  {
    id: '12',
    name: 'Rosé Imperial',
    brand: 'AURUM',
    price: 240,
    image: 'https://i.pinimg.com/736x/87/ad/15/87ad1551e2a156df08104a7a242973ad.jpg',
    category: 'women',
    fragranceType: 'floral',
    size: '75ml',
    rating: 4.7,
    reviews: 143,
    shortDescription: 'Luxury rose fragrance.',
    description: 'Rich rose with warm base.',
    topNotes: ['Rose'],
    middleNotes: ['Geranium'],
    baseNotes: ['Amber'],
    isBestSeller: false,
    isNew: true,
  },
  {
    id: '13',
    name: 'Aqua Regale',
    brand: 'AURUM',
    price: 175,
    image: 'https://i.pinimg.com/webp/736x/47/a0/a1/47a0a156d27482dc6323f103c3d71da7.webp',
    category: 'women',
    fragranceType: 'fresh',
    size: '100ml',
    rating: 4.7,
    reviews: 189,
    shortDescription: 'Fresh aquatic floral.',
    description: 'Light and breezy scent.',
    topNotes: ['Sea Spray'],
    middleNotes: ['Jasmine'],
    baseNotes: ['Musk'],
    isBestSeller: false,
    isNew: false,
  },
  {
    id: '14',
    name: 'Blush Petal',
    brand: 'AURUM',
    price: 190,
    image: 'https://i.pinimg.com/736x/d5/2e/b2/d52eb276ccd22b100eb881dd5871de0b.jpg',
    category: 'women',
    fragranceType: 'floral',
    size: '75ml',
    rating: 4.6,
    reviews: 120,
    shortDescription: 'Soft floral petals.',
    description: 'Delicate everyday perfume.',
    topNotes: ['Peony'],
    middleNotes: ['Rose'],
    baseNotes: ['Musk'],
    isBestSeller: false,
    isNew: true,
  },
  {
    id: '15',
    name: 'Silk Bloom',
    brand: 'AURUM',
    price: 210,
    image: 'https://i.pinimg.com/736x/96/88/c4/9688c48126f8ea4eddab26af447705fe.jpg',
    category: 'women',
    fragranceType: 'floral',
    size: '75ml',
    rating: 4.7,
    reviews: 110,
    shortDescription: 'Smooth and silky floral.',
    description: 'Elegant soft fragrance.',
    topNotes: ['Floral'],
    middleNotes: ['Lily'],
    baseNotes: ['Vanilla'],
    isBestSeller: false,
    isNew: false,
  }
];

// Seed products function
const seedProducts = async () => {
  try {
    // Connect to MongoDB using existing connection
    await connectDB();

    // Delete all existing products
    await Product.deleteMany({});
    console.log('✓ Deleted all existing products');

    // Insert exactly 15 products
    await Product.insertMany(products);
    console.log('Only 15 Products Seeded Successfully');

    // Close database connection
    await mongoose.connection.close();
    console.log('Database connection closed.');
    
    // Exit process after completion
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error.message);
    process.exit(1);
  }
};

// Run the seeder
seedProducts();
