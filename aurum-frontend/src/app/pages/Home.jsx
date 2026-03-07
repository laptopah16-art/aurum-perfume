import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ArrowRight, Star, ChevronLeft, ChevronRight, Play, Loader2 } from 'lucide-react';
import { productAPI } from '../../services/api';
import { useCart } from '../context/CartContext.jsx';
import heroVideo from '../../assets/home 1.mp4';
import vrVideo from '../../assets/vr.mp4';
import testimonialVideo from '../../assets/13511496_3840_2160_25fps.mp4';
import newsletterVideo from '../../assets/13422840-uhd_3840_2160_30fps.mp4';

const HERO_IMAGE = 'https://images.unsplash.com/-91edd95664b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920';
const ABOUT_IMG = 'https://images.unsplash.com/photo-1644820850778-034b767387dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080';




const categories = [
  { label: 'Men', subtitle: 'Bold & Powerful', image: 'https://images.unsplash.com/photo-1759793499912-625d49ae6087?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', filter: 'men' },
  { label: 'Women', subtitle: 'Graceful & Radiant', image: 'https://images.unsplash.com/photo-1643797517590-c44cb552ddcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', filter: 'women' },
  { label: 'Luxury', subtitle: 'Rare & Precious', image: 'https://images.unsplash.com/photo-1610109790326-9a21dfe969b7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', filter: 'luxury' },
  { label: 'New Arrivals', subtitle: 'Latest Creations', image: 'https://images.unsplash.com/photo-1761937841527-fac9281e53fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=600', filter: 'new-arrivals' },
];

const reviews = [
  { name: 'Sophia Laurent', location: 'Paris, France', rating: 5, text: 'Noir Absolu is unlike anything I\'ve ever worn. The oud is deep and perfectly balanced — it feels like wearing liquid gold. Simply extraordinary.', product: 'Noir Absolu' },
  { name: 'James Whitmore', location: 'London, UK', rating: 5, text: 'Obsidian has become my signature scent. Dark, masculine, and incredibly long-lasting. I receive compliments every time I wear it. Worth every penny.', product: 'Obsidian' },
  { name: 'Amelie Dubois', location: 'Milan, Italy', rating: 5, text: 'Or Blanc is pure poetry in a bottle. The florals are luminous and the base is silky — I feel elegant and timeless wearing it. AURUM is in a class of its own.', product: 'Or Blanc' },
  { name: 'Isabella Chen', location: 'New York, USA', rating: 5, text: 'The quality of Ambre Mystique is unreal. The longevity, the projection, the way it evolves throughout the day — it\'s an absolute masterpiece.', product: 'Ambre Mystique' },
];

function FadeInSection({ children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ProductCard({ product, index }) {
  const [hovered, setHovered] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();

  // Handle both API response (_id) and local data (id)
  const productId = product._id || product.id;

  // Format product for cart
  const cartProduct = {
    id: productId,
    name: product.name,
    brand: product.brand,
    price: product.price,
    image: product.image,
    size: product.size,
    fragranceType: product.fragranceType,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative cursor-pointer group"
      onClick={() => navigate(`/product/${productId}`)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden aspect-[3/4] mb-4" style={{ background: '#110f14' }}>
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 transition-opacity duration-400"
          style={{ background: 'linear-gradient(to top, rgba(8,6,8,0.7) 0%, transparent 60%)', opacity: hovered ? 1 : 0.4 }} />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isBestSeller && (
            <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold"
              style={{ background: '#c9a45c', color: '#080608' }}>Best Seller</span>
          )}
          {product.isNew && (
            <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold"
              style={{ border: '1px solid #c9a45c', color: '#c9a45c' }}>New</span>
          )}
          {product.originalPrice && (
            <span className="text-[10px] uppercase tracking-widest px-2.5 py-1 font-semibold"
              style={{ background: 'rgba(201,164,92,0.15)', color: '#c9a45c' }}>Sale</span>
          )}
        </div>

        {/* Quick add button */}
        <motion.div
          className="absolute bottom-4 left-0 right-0 px-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(product);
            }}
            className="w-full py-2.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300"
            style={{ background: '#c9a45c', color: '#080608' }}
          >
            Add to Cart
          </button>
        </motion.div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#c9a45c' }}>{product.brand}</p>
          <h3 className="text-sm mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#f5f0e8' }}>{product.name}</h3>
          <p className="text-xs" style={{ color: '#8a7a6a' }}>{product.size} · {product.fragranceType}</p>
        </div>
        <div className="text-right">
          {product.originalPrice && (
            <p className="text-xs line-through" style={{ color: '#4a4040' }}>${product.originalPrice}</p>
          )}
          <p className="text-sm" style={{ color: '#c9a45c' }}>${product.price}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [currentReview, setCurrentReview] = useState(0);
  const [bestseller, setBestseller] = useState(0);
  
  // Products state - fetch from API
  const [products, setProducts] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend
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
        
        // Filter best sellers and new arrivals properly - support multiple field names
        setFeaturedProducts(productsData.filter((p) => p.isBestSeller || p.bestSeller).slice(0, 4));
        setNewArrivals(productsData.filter((p) => p.isNewArrival || p.isNew || p.newArrival).slice(0, 4));
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to local data if API fails
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filter best sellers from products - support multiple field names
  const bestSellers = products.filter((p) => p.isBestSeller || p.bestSeller);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Loading state
  if (loading) {
    return (
      <div style={{ background: 'transparent', minHeight: '100vh' }}>
        <div className="h-screen flex items-center justify-center">
          <Loader2 className="animate-spin" size={40} style={{ color: '#c9a45c' }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: 'transparent' }}>
      {/* ── HERO ─────────────────────────────── */}
      <section ref={heroRef} className="relative h-screen overflow-hidden flex items-center justify-center">
        <motion.div style={{ y: heroY }} className="absolute inset-0">
          <video 
            src={heroVideo} 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="w-full h-full object-cover video-grayscale"
          />
        </motion.div>

        <motion.div style={{ opacity: heroOpacity }} className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xs uppercase tracking-[0.4em] mb-6"
            style={{ color: '#c9a45c' }}
          >
            Maison de Parfumerie · Est. 1924
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', fontWeight: 400, lineHeight: 1.1, color: '#f5f0e8' }}
          >
            Discover Your<br />
            <em style={{ color: '#c9a45c' }}>Signature Scent</em>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="mt-6 text-sm tracking-wide max-w-md mx-auto"
            style={{ color: '#c8bcae' }}
          >
            Rare ingredients. Master perfumers. Timeless beauty. Welcome to AURUM.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-10 flex items-center justify-center gap-4 flex-wrap"
          >
            <Link
              to="/products"
              className="px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105"
              style={{ background: '#c9a45c', color: '#080608' }}
            >
              Explore Collection
            </Link>
            <Link
              to="/about"
              className="px-8 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-80"
              style={{ border: '1px solid rgba(201,164,92,0.5)', color: '#c9a45c' }}
            >
              Our Story
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-widest" style={{ color: '#c9a45c' }}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-12"
            style={{ background: 'linear-gradient(to bottom, #c9a45c, transparent)' }}
          />
        </motion.div>
      </section>


      <section className="py-16 px-6 max-w-7xl mx-auto">
        <FadeInSection>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: '#c9a45c' }}>Curated for You</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 400, color: '#f5f0e8' }}>
                Featured Fragrances
              </h2>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-xs uppercase tracking-widest transition-opacity hover:opacity-70" style={{ color: '#c9a45c' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </FadeInSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product, i) => (
            <ProductCard key={product._id || product.id} product={product} index={i} />
          ))}
        </div>
      </section>

      {/* ── BEST SELLERS CAROUSEL ──────────────── */}
      <section className="py-20 px-6" style={{ background: '#0d0b0f' }}>
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: '#c9a45c' }}>Most Loved</p>
                <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 400, color: '#f5f0e8' }}>
                  Best Sellers
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setBestseller((prev) => (prev - 1 + bestSellers.length) % bestSellers.length)}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ border: '1px solid rgba(201,164,92,0.4)', color: '#c9a45c' }}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={() => setBestseller((prev) => (prev + 1) % bestSellers.length)}
                  className="w-10 h-10 flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: '#c9a45c', color: '#080608' }}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </FadeInSection>

          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={bestseller}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 gap-0"
              >
                {bestSellers[bestseller] && (
                  <>
                    <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                      {bestSellers[bestseller].video ? (
                        <video
                          src={bestSellers[bestseller].video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          className="w-full h-full object-cover video-grayscale"
                        />
                      ) : (
                        <img
                          src={bestSellers[bestseller].image}
                          alt={bestSellers[bestseller].name}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className="absolute inset-0" style={{ background: 'rgba(8,6,8,0.3)' }} />
                    </div>
                    <div className="flex flex-col justify-center p-10 md:p-16"
                      style={{ background: '#110f14' }}>
                      <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#c9a45c' }}>
                        {bestSellers[bestseller].brand} · Best Seller
                      </p>
                      <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8', lineHeight: 1.2 }}>
                        {bestSellers[bestseller].name}
                      </h2>
                      <div className="flex items-center gap-1 my-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} fill="#c9a45c" style={{ color: '#c9a45c' }} />
                        ))}
                        <span className="text-xs ml-2" style={{ color: '#8a7a6a' }}>
                          {bestSellers[bestseller].rating} ({bestSellers[bestseller].reviews} reviews)
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed mb-8" style={{ color: '#8a7a6a' }}>
                        {bestSellers[bestseller].shortDescription}
                      </p>
                      <div className="flex items-center gap-4 flex-wrap">
                        <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#c9a45c' }}>
                          ${bestSellers[bestseller].price}
                        </span>
                        <Link
                          to={`/product/${bestSellers[bestseller].id}`}
                          className="px-8 py-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:scale-105"
                          style={{ background: '#c9a45c', color: '#080608' }}
                        >
                          Shop Now
                        </Link>
                      </div>
                      <div className="flex gap-2 mt-8">
                        {bestSellers.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setBestseller(i)}
                            className="h-px transition-all duration-300"
                            style={{ width: i === bestseller ? '2rem' : '1rem', background: i === bestseller ? '#c9a45c' : 'rgba(201,164,92,0.3)' }}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <FadeInSection>
          <p className="text-xs uppercase tracking-[0.4em] mb-2 text-center" style={{ color: '#c9a45c' }}>Shop by Category</p>
          <h2 className="text-center mb-12" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 400, color: '#f5f0e8' }}>
            Explore Collections
          </h2>
        </FadeInSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="relative overflow-hidden cursor-pointer group"
              style={{ aspectRatio: '3/4' }}
            >
              <Link to={`/products?category=${cat.filter}`}>
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,6,8,0.85) 0%, rgba(8,6,8,0.2) 60%, transparent 100%)' }} />
                <div className="absolute bottom-5 left-5">
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#c9a45c' }}>{cat.subtitle}</p>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.3rem', color: '#f5f0e8' }}>{cat.label}</h3>
                  <div className="flex items-center gap-2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-xs uppercase tracking-widest" style={{ color: '#c9a45c' }}>Shop Now</span>
                    <ArrowRight size={12} style={{ color: '#c9a45c' }} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VIDEO / CINEMATIC SECTION ──────────── */}
      <section className="relative py-0 overflow-hidden" style={{ height: '60vh', minHeight: '400px' }}>
        <video 
          src={vrVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover video-grayscale"
        />
        <div className="absolute inset-0 flex items-center justify-center"
          style={{ background: 'rgba(8,6,8,0.6)' }}>
          <FadeInSection>
            <div className="text-center px-6">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 cursor-pointer"
                style={{ border: '1px solid rgba(201,164,92,0.6)', background: 'rgba(201,164,92,0.1)' }}
              >
                <Play size={20} style={{ color: '#c9a45c', marginLeft: '2px' }} />
              </motion.div>
              <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a45c' }}>The Process</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3.5rem)', fontWeight: 400, color: '#f5f0e8' }}>
                From Nature to<br /><em>Perfection</em>
              </h2>
              <p className="mt-4 text-sm max-w-md mx-auto" style={{ color: '#c8bcae' }}>
                Each AURUM fragrance begins with a journey — sourcing the world's finest raw materials and entrusting them to our master perfumers.
              </p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ── MORE PRODUCTS ─────────────────────── */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <FadeInSection>
          <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: '#c9a45c' }}>New Arrivals</p>
              <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 400, color: '#f5f0e8' }}>
                Just Arrived
              </h2>
            </div>
            <Link to="/products" className="flex items-center gap-2 text-xs uppercase tracking-widest transition-opacity hover:opacity-70" style={{ color: '#c9a45c' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </FadeInSection>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.slice(4, 8).map((product, i) => (
            <ProductCard key={product._id || product.id} product={product} index={i} />
          ))}
        </div>
      </section>


      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Video */}
        <video 
          src={testimonialVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover video-grayscale"
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(8,6,8,0.75)' }} />
        
        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto">
          <FadeInSection>
            <p className="text-xs uppercase tracking-[0.4em] mb-2 text-center" style={{ color: '#c9a45c' }}>Testimonials</p>
            <h2 className="text-center mb-14" style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.6rem, 3vw, 2.5rem)', fontWeight: 400, color: '#f5f0e8' }}>
              What Our Clients Say
            </h2>
          </FadeInSection>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="flex items-center justify-center gap-1 mb-6">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <Star key={i} size={14} fill="#c9a45c" style={{ color: '#c9a45c' }} />
                ))}
              </div>
              <p className="mb-8 leading-relaxed" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)', color: '#c8bcae', fontStyle: 'italic' }}>
                "{reviews[currentReview].text}"
              </p>
              <p className="text-sm font-semibold mb-1" style={{ color: '#f5f0e8' }}>{reviews[currentReview].name}</p>
              <p className="text-xs" style={{ color: '#8a7a6a' }}>{reviews[currentReview].location} · <em>{reviews[currentReview].product}</em></p>
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-center gap-2 mt-10">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentReview(i)}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === currentReview ? '24px' : '8px',
                  height: '8px',
                  background: i === currentReview ? '#c9a45c' : 'rgba(201,164,92,0.3)',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER / EXCLUSIVE ACCESS ────────── */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background Video */}
        <video 
          src={newsletterVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover video-grayscale"
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(8,6,8,0.75)' }} />
        
        {/* Content */}
        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <FadeInSection>
            <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a45c' }}>Exclusive Access</p>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8' }}>
              Join the Inner Circle
            </h2>
            <p className="mt-4 mb-8 text-sm" style={{ color: '#8a7a6a' }}>
              Subscribe for early access to new launches, private events, and exclusive member offers.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 bg-transparent px-4 py-3.5 text-sm outline-none"
                style={{ border: '1px solid rgba(201,164,92,0.4)', borderRight: 'none', color: '#f5f0e8' }}
              />
              <button
                className="px-6 py-3.5 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90 whitespace-nowrap"
                style={{ background: '#c9a45c', color: '#080608' }}
              >
                Subscribe
              </button>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  );
}

