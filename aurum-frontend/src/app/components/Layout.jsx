import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Menu, X, Search, User, Instagram, Facebook, Twitter, ChevronRight, LogOut, Package } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import footerVideo from '../../assets/8447652-uhd_4096_2160_25fps.mp4';
import BackgroundVideo from './BackgroundVideo.jsx';

// Import videos from assets folder
import homeVideo from '../../assets/home 1.mp4';
import aboutVideo from '../../assets/v11.mp4';
import contactVideo from '../../assets/v12.mp4';
import productVideo from '../../assets/vr.mp4';
import cartVideo from '../../assets/6392268-uhd_2732_1440_24fps.mp4';
import video5 from '../../assets/7815759-hd_1920_1080_25fps.mp4';
import video6 from '../../assets/7815761-hd_1920_1080_25fps.mp4';

// Route-to-video mapping - each page gets its own background video
const videoMap = {
  "/": homeVideo,
  "/about": aboutVideo,
  "/contact": contactVideo,
  "/products": productVideo,
  "/product": productVideo,
  "/cart": cartVideo,
  "/payment": video5,
  "/notes": video6,
  "/checkout": video6,
  "/login": video5,
  "/order-confirmation": video6,
};

// Get video by route - handles exact matches and partial matches
const getVideoByRoute = (route) => {
  // Check for exact match first
  if (videoMap[route]) {
    return videoMap[route];
  }
  
  // Check for partial match (e.g., /product/:id)
  for (const [routePath, video] of Object.entries(videoMap)) {
    if (route.startsWith(routePath) && routePath !== '/') {
      return video;
    }
  }
  
  // Return default video (home)
  return videoMap["/"];
};

// User Menu Component - shows different options based on auth state
const UserMenu = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isAuthenticated) {
    return (
      <button
        onClick={() => navigate('/login')}
        className="p-2 transition-colors duration-200 hover:opacity-70"
        style={{ color: '#c8bcae' }}
        title="Sign In"
      >
        <User size={18} />
      </button>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="p-2 transition-colors duration-200 hover:opacity-70 flex items-center gap-2"
        style={{ color: '#c8bcae' }}
        title="My Account"
      >
        <User size={18} />
        <span className="text-xs hidden lg:inline">{user?.name?.split(' ')[0]}</span>
      </button>
      
      {/* Dropdown Menu */}
      {menuOpen && (
        <div
          className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1"
          style={{ background: 'rgba(8,6,8,0.98)', border: '1px solid rgba(201,164,92,0.3)' }}
        >
          <button
            onClick={() => { navigate('/account'); setMenuOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left transition-colors hover:opacity-70"
            style={{ color: '#f5f0e8' }}
          >
            <User size={16} />
            My Account
          </button>
          <button
            onClick={() => { navigate('/account'); setMenuOpen(false); }}
            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left transition-colors hover:opacity-70"
            style={{ color: '#f5f0e8' }}
          >
            <Package size={16} />
            Orders
          </button>
          <div style={{ borderTop: '1px solid rgba(201,164,92,0.2)' }} className="mt-1 pt-1">
            <button
              onClick={() => { logout(); setMenuOpen(false); navigate('/'); }}
              className="flex items-center gap-2 w-full px-4 py-2 text-sm text-left transition-colors hover:opacity-70"
              style={{ color: '#dc2626' }}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export const Layout = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  // Get the video for the current route - useMemo ensures it's computed only when route changes
  const currentVideo = useMemo(() => {
    return getVideoByRoute(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Collections', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'transparent', color: '#f5f0e8', fontFamily: 'Inter, sans-serif' }}>
      {/* Global Background Video - renders based on current route */}
      <BackgroundVideo key={location.pathname} videoSrc={currentVideo} />
      
      {/* NAVBAR */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled || !isHome
            ? 'rgba(255,255,255,0.1)'
            : 'transparent',
          backdropFilter: scrolled || !isHome ? 'blur(20px)' : 'none',
          borderBottom: scrolled || !isHome ? '1px solid rgba(201,164,92,0.15)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-start gap-0">
            <span style={{ fontFamily: 'Playfair Display, serif', color: '#c9a45c', letterSpacing: '0.25em', fontSize: '1.4rem', fontWeight: 600 }}>
              AURUM
            </span>
            <span style={{ color: '#8a7a6a', letterSpacing: '0.35em', fontSize: '0.55rem', marginTop: '-2px' }}>
              PARFUMERIE DE LUXE
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative transition-colors duration-300 text-sm tracking-widest uppercase"
                style={{
                  color: location.pathname === link.path ? '#c9a45c' : '#c8bcae',
                  letterSpacing: '0.15em',
                }}
              >
                {link.label}
                {location.pathname === link.path && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-px"
                    style={{ background: '#c9a45c' }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 transition-colors duration-200 hover:opacity-70"
              style={{ color: '#c8bcae' }}
            >
              <Search size={18} />
            </button>
            
            {/* User Icon - Show different options based on auth state */}
            <UserMenu />
            
            <button
              onClick={() => navigate('/cart')}
              className="p-2 relative transition-colors duration-200 hover:opacity-70"
              style={{ color: '#c8bcae' }}
            >
              <ShoppingBag size={18} />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center text-[10px]"
                  style={{ background: '#c9a45c', color: '#080608', fontWeight: 700 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 transition-colors duration-200"
              style={{ color: '#c8bcae' }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
              style={{ borderTop: '1px solid rgba(201,164,92,0.15)' }}
            >
              <div className="max-w-7xl mx-auto px-6 py-4">
                <input
                  autoFocus
                  placeholder="Search for fragrances..."
                  className="w-full bg-transparent outline-none text-sm tracking-wide"
                  style={{ color: '#f5f0e8', caretColor: '#c9a45c' }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigate('/products');
                      setSearchOpen(false);
                    }
                  }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35 }}
              className="md:hidden overflow-hidden"
              style={{ background: 'rgba(8,6,8,0.98)', borderTop: '1px solid rgba(201,164,92,0.15)' }}
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="flex items-center justify-between text-sm uppercase tracking-widest"
                    style={{ color: location.pathname === link.path ? '#c9a45c' : '#c8bcae' }}
                  >
                    {link.label}
                    <ChevronRight size={14} style={{ color: '#c9a45c' }} />
                  </Link>
                ))}
                <div className="pt-4" style={{ borderTop: '1px solid rgba(201,164,92,0.15)' }}>
                  <Link to="/login" className="text-sm uppercase tracking-widest" style={{ color: '#8a7a6a' }}>
                    Sign In / Register
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main Content */}
      <main className="flex-1" style={{ background: 'transparent', position: 'relative', zIndex: 1 }}>
        {children}
      </main>

      {/* FOOTER */}
      <footer className="relative overflow-hidden" style={{ borderTop: '1px solid rgba(201,164,92,0.15)' }}>
        {/* Background Video */}
        <video 
          src={footerVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover video-grayscale"
        />
        {/* Overlay */}
        <div className="absolute inset-0" style={{ background: 'rgba(13,11,15,0.95)' }} />
        
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-8" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-4">
                <div style={{ fontFamily: 'Playfair Display, serif', color: '#c9a45c', letterSpacing: '0.25em', fontSize: '1.4rem', fontWeight: 600 }}>
                  AURUM
                </div>
                <div style={{ color: '#8a7a6a', letterSpacing: '0.3em', fontSize: '0.55rem', marginTop: '-2px' }}>
                  PARFUMERIE DE LUXE
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b5f52' }}>
                Crafting extraordinary fragrances since 1924. Each bottle holds a story of rare ingredients, master perfumers, and timeless beauty.
              </p>
              <div className="flex gap-4">
                {[Instagram, Facebook, Twitter].map((Icon, i) => (
                  <a key={i} href="#" className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                    style={{ border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}>
                    <Icon size={15} />
                  </a>
                ))}
              </div>
            </div>

            {/* Collections */}
            <div>
              <h4 className="text-xs uppercase tracking-widest mb-5" style={{ color: '#c9a45c' }}>Collections</h4>
              <ul className="space-y-3">
                {['Men\'s Fragrances', 'Women\'s Fragrances', 'Luxury Editions', 'New Arrivals', 'Gift Sets'].map((item) => (
                  <li key={item}>
                    <Link to="/products" className="text-sm transition-colors duration-200 hover:opacity-80" style={{ color: '#8a7a6a' }}>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Info */}
            <div>
              <h4 className="text-xs uppercase tracking-widest mb-5" style={{ color: '#c9a45c' }}>Information</h4>
              <ul className="space-y-3">
                {[
                  { label: 'About Us', path: '/about' },
                  { label: 'Contact', path: '/contact' },
                  { label: 'Shipping Policy', path: '/contact' },
                  { label: 'Privacy Policy', path: '/contact' },
                  { label: 'Returns', path: '/contact' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.path} className="text-sm transition-colors duration-200 hover:opacity-80" style={{ color: '#8a7a6a' }}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-xs uppercase tracking-widest mb-5" style={{ color: '#c9a45c' }}>Newsletter</h4>
              <p className="text-sm mb-4" style={{ color: '#6b5f52' }}>
                Receive exclusive previews and invitations to private events.
              </p>
              <div className="flex" style={{ border: '1px solid rgba(201,164,92,0.3)' }}>
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 bg-transparent text-sm px-3 py-2.5 outline-none"
                  style={{ color: '#f5f0e8' }}
                />
                <button className="px-4 text-xs uppercase tracking-widest transition-all duration-300"
                  style={{ background: '#c9a45c', color: '#080608', fontWeight: 600 }}>
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6"
            style={{ borderTop: '1px solid rgba(201,164,92,0.1)' }}>
            <p className="text-xs" style={{ color: '#4a4040' }}>
              © 2026 AURUM Parfumerie de Luxe. All rights reserved.
            </p>
            <div className="flex gap-6">
              {['Privacy', 'Terms', 'Cookies'].map((item) => (
                <a key={item} href="#" className="text-xs transition-colors duration-200 hover:opacity-80" style={{ color: '#4a4040' }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

