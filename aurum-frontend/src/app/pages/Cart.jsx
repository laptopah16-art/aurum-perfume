import React from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShoppingBag, ArrowRight, ChevronLeft } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Cart() {
  const { state, removeItem, updateQuantity, total, subtotal } = useCart();
  const navigate = useNavigate();
  const shipping = subtotal >= 200 ? 0 : 15;
  const finalTotal = total + shipping;

  return (
    <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-12 px-6 text-center" style={{ background: 'rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-[0.4em] mb-2"
          style={{ color: '#c9a45c' }}
        >Your Selection</motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8' }}
        >
          Shopping Cart
        </motion.h1>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {state.items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            <ShoppingBag size={48} className="mx-auto mb-6" style={{ color: 'rgba(201,164,92,0.3)' }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2rem', fontWeight: 400, color: '#f5f0e8' }}>
              Your cart is empty
            </h2>
            <p className="mt-3 mb-8 text-sm" style={{ color: '#8a7a6a' }}>
              Discover our extraordinary collection of fragrances.
            </p>
            <Link to="/products"
              className="px-8 py-4 text-xs uppercase tracking-widest font-semibold inline-block"
              style={{ background: '#c9a45c', color: '#080608' }}>
              Explore Collection
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <button
                onClick={() => navigate('/products')}
                className="flex items-center gap-2 text-xs uppercase tracking-widest mb-8 transition-opacity hover:opacity-70"
                style={{ color: '#8a7a6a' }}
              >
                <ChevronLeft size={14} /> Continue Shopping
              </button>

              <div className="space-y-0" style={{ borderTop: '1px solid rgba(201,164,92,0.1)' }}>
                <AnimatePresence>
                  {state.items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="flex gap-5 py-6"
                      style={{ borderBottom: '1px solid rgba(201,164,92,0.08)' }}
                    >
                      {/* Image */}
                      <div
                        className="flex-shrink-0 cursor-pointer"
                        style={{ width: '100px', height: '130px', background: '#110f14', overflow: 'hidden' }}
                        onClick={() => navigate(`/product/${item.product.id}`)}
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <p className="text-[10px] uppercase tracking-widest" style={{ color: '#c9a45c' }}>{item.product.brand}</p>
                          <h3 className="mt-0.5 mb-1" style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.05rem', color: '#f5f0e8' }}>
                            {item.product.name}
                          </h3>
                          <p className="text-xs" style={{ color: '#6b5f52' }}>
                            {item.selectedSize} · {item.product.fragranceType}
                          </p>
                        </div>

                        <div className="flex items-end justify-between flex-wrap gap-3">
                          {/* Quantity */}
                          <div className="flex items-center gap-0">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center text-sm transition-opacity hover:opacity-70"
                              style={{ border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}
                            >−</button>
                            <span className="w-10 h-8 flex items-center justify-center text-sm"
                              style={{ borderTop: '1px solid rgba(201,164,92,0.3)', borderBottom: '1px solid rgba(201,164,92,0.3)', color: '#f5f0e8' }}>
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center text-sm transition-opacity hover:opacity-70"
                              style={{ border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}
                            >+</button>
                          </div>

                          {/* Price + Remove */}
                          <div className="flex items-center gap-4">
                            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.1rem', color: '#c9a45c' }}>
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="p-1.5 transition-opacity hover:opacity-70"
                              style={{ color: '#6b5f52' }}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="sticky top-24 p-6"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(201,164,92,0.15)' }}
              >
                <h2 className="text-xs uppercase tracking-widest mb-6" style={{ color: '#c9a45c' }}>Order Summary</h2>

                <div className="space-y-3 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#8a7a6a' }}>Subtotal</span>
                    <span style={{ color: '#f5f0e8' }}>${subtotal.toFixed(2)}</span>
                  </div>
                  {state.discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span style={{ color: '#8a7a6a' }}>Discount ({state.discount}%)</span>
                      <span style={{ color: '#c9a45c' }}>-${(subtotal * state.discount / 100).toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span style={{ color: '#8a7a6a' }}>Shipping</span>
                    <span style={{ color: shipping === 0 ? '#c9a45c' : '#f5f0e8' }}>
                      {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  {subtotal > 0 && subtotal < 200 && (
                    <p className="text-[10px]" style={{ color: '#6b5f52' }}>
                      Add ${(200 - subtotal).toFixed(2)} more for free shipping
                    </p>
                  )}
                </div>

                <div className="flex justify-between items-baseline mb-8">
                  <span className="text-xs uppercase tracking-widest" style={{ color: '#8a7a6a' }}>Total</span>
                  <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#c9a45c' }}>
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate('/checkout')}
                  className="w-full py-4 flex items-center justify-center gap-2 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90"
                  style={{ background: '#c9a45c', color: '#080608' }}
                >
                  Proceed to Checkout <ArrowRight size={14} />
                </motion.button>

                <div className="mt-5 flex items-center justify-center gap-4">
                  {['Visa', 'Mastercard', 'PayPal', 'UPI'].map((method) => (
                    <span key={method} className="text-[10px] uppercase tracking-wide px-2 py-1"
                      style={{ border: '1px solid rgba(201,164,92,0.15)', color: '#4a4040' }}>
                      {method}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

