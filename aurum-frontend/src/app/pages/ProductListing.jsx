import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ChevronDown, Star, X, ArrowUpDown, Loader2 } from 'lucide-react';
import { productAPI } from '../../services/api';
import { useCart } from '../context/CartContext.jsx';

const FRAGMENT_TYPES = ['floral', 'woody', 'oriental', 'fresh', 'citrus'];
const CATEGORIES = ['men', 'women', 'luxury', 'unisex'];

export default function ProductListing() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialCategory = searchParams.get('category') || '';
  const [selectedCategories, setSelectedCategories] = useState(initialCategory ? [initialCategory] : []);
  const [selectedFragrances, setSelectedFragrances] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [sortBy, setSortBy] = useState('featured');
  const [filterOpen, setFilterOpen] = useState(false);
  const [addedId, setAddedId] = useState(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getAll();
        // Handle both response formats: { success, data: [...] } or { data: [...] } or direct array
        // Also handle: { success, count, data: [...] }
        let productsData = [];
        if (Array.isArray(response)) {
          productsData = response;
        } else if (response?.data) {
          productsData = Array.isArray(response.data) ? response.data : response.data.data;
        } else if (response?.products) {
          productsData = response.products;
        }
        setProducts(productsData || []);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setError('Failed to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products locally (can also be done via API params)
  const filtered = useMemo(() => {
    let list = [...products];
    if (selectedCategories.length) list = list.filter((p) => selectedCategories.includes(p.category));
    if (selectedFragrances.length) list = list.filter((p) => selectedFragrances.includes(p.fragranceType));
    list = list.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1]);

    switch (sortBy) {
      case 'price-asc': list.sort((a, b) => a.price - b.price); break;
      case 'price-desc': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); break;
    }
    return list;
  }, [products, selectedCategories, selectedFragrances, priceRange, sortBy]);

  const toggleFilter = (arr, setArr, val) => {
    setArr((prev) => prev.includes(val) ? prev.filter((x) => x !== val) : [...prev, val]);
  };

  const handleAddToCart = (product, e) => {
    e.stopPropagation();
    // Convert API product to cart format
    const cartProduct = {
      id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: product.size,
      fragranceType: product.fragranceType,
    };
    addItem(cartProduct);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedFragrances([]);
    setPriceRange([0, 500]);
  };

  const hasFilters = selectedCategories.length > 0 || selectedFragrances.length > 0 || priceRange[0] > 0 || priceRange[1] < 500;

  if (loading) {
    return (
      <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
        <div className="py-16 px-6 text-center" style={{ 
          background: 'rgba(255,255,255,0.1)', 
          borderBottom: '1px solid rgba(201,164,92,0.1)'
        }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: '#c9a45c' }}
          >
            Explore
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#f5f0e8' }}
          >
            All Collections
          </motion.h1>
        </div>
        <div className="flex items-center justify-center py-32">
          <Loader2 className="animate-spin" size={32} style={{ color: '#c9a45c' }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
        <div className="py-16 px-6 text-center" style={{ 
          background: 'rgba(255,255,255,0.1)', 
          borderBottom: '1px solid rgba(201,164,92,0.1)'
        }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs uppercase tracking-[0.4em] mb-3"
            style={{ color: '#c9a45c' }}
          >
            Explore
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#f5f0e8' }}
          >
            All Collections
          </motion.h1>
        </div>
        <div className="text-center py-24">
          <p style={{ color: '#8a7a6a', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-3 text-xs uppercase tracking-widest"
            style={{ background: '#c9a45c', color: '#080608' }}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-16 px-6 text-center" style={{ 
        background: 'rgba(255,255,255,0.1)', 
        borderBottom: '1px solid rgba(201,164,92,0.1)'
      }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.4em] mb-3"
          style={{ color: '#c9a45c' }}
        >
          Explore
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#f5f0e8' }}
        >
          All Collections
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-3 text-sm"
          style={{ color: '#8a7a6a' }}
        >
          {filtered.length} fragrances
        </motion.p>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-widest transition-all duration-200"
              style={{ border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}
            >
              <SlidersHorizontal size={14} />
              Filters {hasFilters && `(Active)`}
            </button>

            {hasFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
                style={{ color: '#8a7a6a' }}
              >
                <X size={12} /> Clear
              </button>
            )}

            {/* Active filter chips */}
            {selectedCategories.map((cat) => (
              <span key={cat} className="flex items-center gap-1.5 px-3 py-1.5 text-xs capitalize"
                style={{ background: 'rgba(201,164,92,0.1)', border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}>
                {cat}
                <button onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}><X size={10} /></button>
              </span>
            ))}
            {selectedFragrances.map((frag) => (
              <span key={frag} className="flex items-center gap-1.5 px-3 py-1.5 text-xs capitalize"
                style={{ background: 'rgba(201,164,92,0.1)', border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}>
                {frag}
                <button onClick={() => toggleFilter(selectedFragrances, setSelectedFragrances, frag)}><X size={10} /></button>
              </span>
            ))}
          </div>

          {/* Sort */}
          <div className="relative flex items-center gap-2">
            <ArrowUpDown size={14} style={{ color: '#8a7a6a' }} />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-xs uppercase tracking-widest outline-none pr-4 cursor-pointer"
              style={{ color: '#c8bcae' }}
            >
              <option value="featured" style={{ background: '#110f14' }}>Featured</option>
              <option value="price-asc" style={{ background: '#110f14' }}>Price: Low to High</option>
              <option value="price-desc" style={{ background: '#110f14' }}>Price: High to Low</option>
              <option value="rating" style={{ background: '#110f14' }}>Top Rated</option>
              <option value="newest" style={{ background: '#110f14' }}>Newest</option>
            </select>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="overflow-hidden mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-6"
                style={{ border: '1px solid rgba(201,164,92,0.15)', background: '#0d0b0f' }}>
                {/* Category */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: '#c9a45c' }}>Category</h4>
                  <div className="flex flex-wrap gap-2">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => toggleFilter(selectedCategories, setSelectedCategories, cat)}
                        className="px-3 py-1.5 text-xs uppercase tracking-wide transition-all duration-200 capitalize"
                        style={{
                          background: selectedCategories.includes(cat) ? '#c9a45c' : 'transparent',
                          color: selectedCategories.includes(cat) ? '#080608' : '#8a7a6a',
                          border: `1px solid ${selectedCategories.includes(cat) ? '#c9a45c' : 'rgba(201,164,92,0.2)'}`,
                        }}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fragrance */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: '#c9a45c' }}>Fragrance Type</h4>
                  <div className="flex flex-wrap gap-2">
                    {FRAGMENT_TYPES.map((frag) => (
                      <button
                        key={frag}
                        onClick={() => toggleFilter(selectedFragrances, setSelectedFragrances, frag)}
                        className="px-3 py-1.5 text-xs uppercase tracking-wide transition-all duration-200 capitalize"
                        style={{
                          background: selectedFragrances.includes(frag) ? '#c9a45c' : 'transparent',
                          color: selectedFragrances.includes(frag) ? '#080608' : '#8a7a6a',
                          border: `1px solid ${selectedFragrances.includes(frag) ? '#c9a45c' : 'rgba(201,164,92,0.2)'}`,
                        }}
                      >
                        {frag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h4 className="text-xs uppercase tracking-widest mb-4" style={{ color: '#c9a45c' }}>
                    Price Range: <span style={{ color: '#f5f0e8' }}>${priceRange[0]} – ${priceRange[1]}</span>
                  </h4>
                  <div className="flex flex-col gap-3">
                    <input
                      type="range" min={0} max={500} step={10}
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
                      className="w-full accent-amber-500"
                    />
                    <input
                      type="range" min={0} max={500} step={10}
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p style={{ color: '#8a7a6a', fontFamily: 'Playfair Display, serif', fontSize: '1.5rem' }}>No fragrances found</p>
            <p className="text-sm mt-2" style={{ color: '#4a4040' }}>Try adjusting your filters</p>
            <button onClick={clearFilters} className="mt-6 px-6 py-3 text-xs uppercase tracking-widest"
              style={{ background: '#c9a45c', color: '#080608' }}>
              Clear Filters
            </button>
          </div>
        ) : (
          <motion.div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
            <AnimatePresence>
              {filtered.map((product, i) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => navigate(`/product/${product._id}`)}
                >
                  <div className="relative overflow-hidden mb-4" style={{ aspectRatio: '3/4', background: '#110f14' }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'; }}
                    />
                    <div className="absolute inset-0 transition-opacity duration-400"
                      style={{ background: 'linear-gradient(to top, rgba(8,6,8,0.7) 0%, transparent 60%)', opacity: 0.4 }} />

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {product.isBestSeller && (
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5"
                          style={{ background: '#c9a45c', color: '#080608', fontWeight: 700 }}>Best Seller</span>
                      )}
                      {product.isNew && (
                        <span className="text-[10px] uppercase tracking-widest px-2 py-0.5"
                          style={{ border: '1px solid #c9a45c', color: '#c9a45c' }}>New</span>
                      )}
                    </div>

                    {/* Quick add */}
                    <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="w-full py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
                        style={{
                          background: addedId === product._id ? 'rgba(201,164,92,0.9)' : '#c9a45c',
                          color: '#080608',
                        }}
                      >
                        {addedId === product._id ? '✓ Added' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#c9a45c' }}>{product.brand}</p>
                      <h3 className="text-sm mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#f5f0e8' }}>{product.name}</h3>
                      <div className="flex items-center gap-1 mb-1">
                        <Star size={10} fill="#c9a45c" style={{ color: '#c9a45c' }} />
                        <span className="text-[10px]" style={{ color: '#8a7a6a' }}>{product.rating} ({product.reviews})</span>
                      </div>
                      <p className="text-xs" style={{ color: '#6b5f52' }}>{product.size} · {product.fragranceType}</p>
                    </div>
                    <div className="text-right ml-2">
                      {product.originalPrice && (
                        <p className="text-xs line-through" style={{ color: '#4a4040' }}>${product.originalPrice}</p>
                      )}
                      <p className="text-sm" style={{ color: '#c9a45c' }}>${product.price}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}

