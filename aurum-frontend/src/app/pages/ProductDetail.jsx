import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Heart, Star, ChevronLeft, ChevronRight, ArrowLeft, Share2, ZoomIn, X, Loader2 } from 'lucide-react';
import { productAPI } from '../../services/api';
import { useCart } from '../context/CartContext.jsx';

const NOTE_COLORS = {
  top: '#c9a45c',
  middle: '#e8c97a',
  base: '#8a7a6a',
};

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('notes');
  const [zoomed, setZoomed] = useState(false);
  const [liked, setLiked] = useState(false);

  // Fetch product from API
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await productAPI.getById(id);
        setProduct(response.data.data);
        
        // Fetch related products by category
        const relatedResponse = await productAPI.getByCategory(response.data.data.category);
        setRelated(relatedResponse.data.data.filter(p => p._id !== id).slice(0, 4));
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Product not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'transparent', paddingTop: '80px' }}>
        <Loader2 className="animate-spin" size={40} style={{ color: '#c9a45c' }} />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'transparent', paddingTop: '80px' }}>
        <div className="text-center">
          <p style={{ color: '#8a7a6a', fontFamily: 'Playfair Display, serif', fontSize: '2rem' }}>Fragrance not found</p>
          <button onClick={() => navigate('/products')} className="mt-6 px-6 py-3 text-xs uppercase tracking-widest"
            style={{ background: '#c9a45c', color: '#080608' }}>
            Back to Collections
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: product.size,
      fragranceType: product.fragranceType,
    };
    addItem(cartProduct, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    const cartProduct = {
      id: product._id,
      name: product.name,
      brand: product.brand,
      price: product.price,
      image: product.image,
      size: product.size,
      fragranceType: product.fragranceType,
    };
    addItem(cartProduct, quantity);
    navigate('/checkout');
  };

  const reviewsData = [
    { name: 'Alexandre M.', rating: 5, date: 'January 2026', text: `${product.name} is everything I hoped for and more. The longevity is incredible.` },
    { name: 'Isabelle K.', rating: 5, date: 'February 2026', text: 'Absolutely mesmerizing. The projection is perfect and it evolves beautifully on skin.' },
    { name: 'Thomas R.', rating: 4, date: 'February 2026', text: 'A genuinely sophisticated fragrance. Worthy of AURUM\'s stellar reputation.' },
  ];

  // Helper to get notes arrays
  const topNotes = product.fragranceNotes?.top || product.topNotes || [];
  const middleNotes = product.fragranceNotes?.middle || product.middleNotes || [];
  const baseNotes = product.fragranceNotes?.base || product.baseNotes || [];

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center gap-2 text-xs" style={{ color: '#6b5f52' }}>
          <button onClick={() => navigate('/')} className="hover:opacity-70 transition-opacity">Home</button>
          <span>/</span>
          <button onClick={() => navigate('/products')} className="hover:opacity-70 transition-opacity">Collections</button>
          <span>/</span>
          <span style={{ color: '#c9a45c' }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div
            className="relative overflow-hidden cursor-zoom-in"
            style={{ aspectRatio: '3/4', background: '#110f14' }}
            onClick={() => setZoomed(true)}
          >
            <motion.img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.6 }}
              onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'; }}
            />
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(201,164,92,0.03) 0%, transparent 60%)' }} />
            <button className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center"
              style={{ background: 'rgba(8,6,8,0.6)', color: '#c9a45c' }}>
              <ZoomIn size={16} />
            </button>
          </div>

          {/* Badge */}
          <div className="flex gap-2 mt-3">
            {product.isBestSeller && (
              <span className="text-[10px] uppercase tracking-widest px-3 py-1"
                style={{ background: '#c9a45c', color: '#080608', fontWeight: 700 }}>Best Seller</span>
            )}
            {product.isNew && (
              <span className="text-[10px] uppercase tracking-widest px-3 py-1"
                style={{ border: '1px solid #c9a45c', color: '#c9a45c' }}>New Arrival</span>
            )}
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col"
        >
          <div className="mb-2">
            <p className="text-xs uppercase tracking-[0.4em] mb-1" style={{ color: '#c9a45c' }}>{product.brand}</p>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8', lineHeight: 1.15 }}>
              {product.name}
            </h1>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 my-3">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={13} fill={i < Math.floor(product.rating) ? '#c9a45c' : 'transparent'}
                  style={{ color: '#c9a45c' }} />
              ))}
            </div>
            <span className="text-xs" style={{ color: '#8a7a6a' }}>
              {product.rating} · {product.reviews} Reviews
            </span>
          </div>

          <div className="w-10 h-px my-4" style={{ background: '#c9a45c' }} />

          <p className="text-sm leading-relaxed mb-6" style={{ color: '#8a7a6a' }}>
            {product.description}
          </p>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', color: '#c9a45c' }}>
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-base line-through" style={{ color: '#4a4040' }}>
                ${product.originalPrice}
              </span>
            )}
            <span className="text-xs uppercase tracking-widest" style={{ color: '#8a7a6a' }}>{product.size}</span>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8a7a6a' }}>Quantity</p>
            <div className="flex items-center gap-0">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:opacity-70"
                style={{ border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}
              >−</button>
              <span className="w-12 h-10 flex items-center justify-center text-sm"
                style={{ borderTop: '1px solid rgba(201,164,92,0.3)', borderBottom: '1px solid rgba(201,164,92,0.3)', color: '#f5f0e8' }}>
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:opacity-70"
                style={{ border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}
              >+</button>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mb-6 flex-wrap">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
              style={{ background: addedToCart ? 'rgba(201,164,92,0.8)' : '#c9a45c', color: '#080608' }}
            >
              <ShoppingBag size={15} />
              {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleBuyNow}
              className="flex-1 py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-80"
              style={{ border: '1px solid rgba(201,164,92,0.5)', color: '#c9a45c' }}
            >
              Buy Now
            </motion.button>
            <button
              onClick={() => setLiked(!liked)}
              className="w-auto px-3 h-auto py-2 flex items-center justify-center transition-all duration-200"
              style={{ border: '1px solid rgba(201,164,92,0.3)', color: liked ? '#c9a45c' : '#6b5f52' }}
            >
              <Heart size={18} fill={liked ? '#c9a45c' : 'none'} />
            </button>
          </div>

          {/* Info Pills */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {['Free Shipping over $200', 'Authentic Guaranteed', 'Gift Wrapping Available'].map((item) => (
              <span key={item} className="text-[10px] uppercase tracking-wide px-3 py-1.5"
                style={{ border: '1px solid rgba(201,164,92,0.15)', color: '#6b5f52' }}>
                {item}
              </span>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ borderTop: '1px solid rgba(201,164,92,0.15)' }}>
            <div className="flex gap-0">
              {['notes', 'details', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className="px-4 py-3 text-xs uppercase tracking-widest capitalize transition-all duration-200"
                  style={{
                    color: activeTab === tab ? '#c9a45c' : '#6b5f52',
                    borderBottom: activeTab === tab ? '1px solid #c9a45c' : '1px solid transparent',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="py-5"
              >
                {activeTab === 'notes' && (
                  <div className="space-y-4">
                    {['top', 'middle', 'base'].map((type) => (
                      <div key={type}>
                        <p className="text-xs uppercase tracking-widest mb-2" style={{ color: NOTE_COLORS[type] }}>
                          {type} Notes
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {(type === 'top' ? topNotes : type === 'middle' ? middleNotes : baseNotes).map((note) => (
                            <span key={note} className="text-xs px-3 py-1"
                              style={{ border: `1px solid ${NOTE_COLORS[type]}40`, color: '#c8bcae', background: `${NOTE_COLORS[type]}08` }}>
                              {note}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'details' && (
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Brand', value: product.brand },
                      { label: 'Size', value: product.size },
                      { label: 'Category', value: product.category },
                      { label: 'Type', value: product.fragranceType },
                      { label: 'Concentration', value: 'Eau de Parfum' },
                      { label: 'Origin', value: 'Paris, France' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex flex-col gap-1">
                        <span className="text-[10px] uppercase tracking-widest" style={{ color: '#6b5f52' }}>{label}</span>
                        <span className="text-sm capitalize" style={{ color: '#c8bcae' }}>{value}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div className="space-y-5">
                    {reviewsData.map((review, i) => (
                      <div key={i} className="pb-4" style={{ borderBottom: '1px solid rgba(201,164,92,0.08)' }}>
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="text-sm" style={{ color: '#f5f0e8' }}>{review.name}</p>
                            <p className="text-xs" style={{ color: '#6b5f52' }}>{review.date}</p>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(review.rating)].map((_, j) => (
                              <Star key={j} size={11} fill="#c9a45c" style={{ color: '#c9a45c' }} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs leading-relaxed" style={{ color: '#8a7a6a' }}>{review.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 px-6 max-w-7xl mx-auto">
          <div className="mb-8 p-6" style={{ borderTop: '1px solid rgba(201,164,92,0.1)', paddingTop: '3rem', background: 'rgba(255,255,255,0.05)' }}>
            <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: '#c9a45c' }}>You May Also Love</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 400, color: '#f5f0e8' }}>
              Related Fragrances
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {related.map((p, i) => (
              <motion.div
                key={p._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
                onClick={() => navigate(`/product/${p._id}`)}
              >
                <div className="relative overflow-hidden mb-3" style={{ aspectRatio: '3/4', background: '#110f14' }}>
                  <img src={p.image} alt={p.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1772191399367-91ed8d95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=800'; }} />
                </div>
                <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#c9a45c' }}>{p.brand}</p>
                <h3 className="text-sm mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#f5f0e8' }}>{p.name}</h3>
                <p className="text-sm" style={{ color: '#c9a45c' }}>${p.price}</p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 cursor-zoom-out"
            style={{ background: 'rgba(0,0,0,0.95)' }}
            onClick={() => setZoomed(false)}
          >
            <motion.img
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              src={product.image}
              alt={product.name}
              className="max-h-[85vh] max-w-full object-contain"
            />
            <button className="absolute top-6 right-6 text-xs uppercase tracking-widest"
              style={{ color: '#c9a45c' }}>
              <X size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

