import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Check, Truck, Package, Shield, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../../services/api';
import BackgroundVideo from '../components/BackgroundVideo';

const INPUT_STYLE = {
  background: 'transparent',
  border: '1px solid rgba(201,164,92,0.25)',
  color: '#f5f0e8',
  outline: 'none',
  padding: '12px 14px',
  fontSize: '0.85rem',
  width: '100%',
  transition: 'border-color 0.2s',
};

const LABEL_STYLE = {
  fontSize: '0.7rem',
  textTransform: 'uppercase',
  letterSpacing: '0.15em',
  color: '#8a7a6a',
  marginBottom: '6px',
  display: 'block',
};

const COUPON_CODES = {
  AURUM20: 20,
  LUXURY10: 10,
  WELCOME15: 15,
};

const deliveryOptions = [
  { id: 'standard', label: 'Standard Delivery', subtitle: '5–7 business days', price: 0, icon: Package },
  { id: 'express', label: 'Express Delivery', subtitle: '2–3 business days', price: 15, icon: Truck },
  { id: 'overnight', label: 'Overnight Delivery', subtitle: 'Next business day', price: 35, icon: Shield },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { state, subtotal, total, applyCoupon, clearCart } = useCart();
  const { user, isAuthenticated } = useAuth();
  
  const [delivery, setDelivery] = useState('standard');
  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [form, setForm] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ').slice(1).join(' ') || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    country: 'United States',
  });

  const deliveryPrice = deliveryOptions.find((d) => d.id === delivery)?.price ?? 0;
  const orderTotal = total + deliveryPrice;

  const handleCoupon = () => {
    const discount = COUPON_CODES[couponInput.toUpperCase()];
    if (discount) {
      applyCoupon(couponInput.toUpperCase(), discount);
      setCouponMsg(`✓ Coupon applied — ${discount}% off!`);
    } else {
      setCouponMsg('Invalid coupon code.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (state.items.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Prepare order items - ensure product ID is properly extracted
      const orderItems = state.items.map((item) => {
        // Handle both id and _id formats for product
        const productId = item.product?.id || item.product?._id;
        
        if (!productId) {
          console.error('Product ID missing for item:', item);
          throw new Error('Invalid product data in cart');
        }

        return {
          product: productId,
          name: item.product.name,
          image: item.product.image,
          price: item.product.price,
          quantity: item.quantity,
          size: item.product.size || '100ml',
        };
      });

      // Prepare shipping address
      const shippingAddress = {
        fullName: `${form.firstName} ${form.lastName}`.trim(),
        addressLine1: form.address,
        city: form.city,
        state: form.state,
        postalCode: form.zip,
        country: form.country,
        phone: form.phone,
      };

      // Create order with Razorpay payment method (pending payment)
      const response = await orderAPI.create({
        orderItems,
        shippingAddress,
        paymentMethod: 'razorpay',
        subtotal,
        tax: 0,
        shippingCost: deliveryPrice,
        discount: state.discount,
        couponCode: state.couponCode,
        totalPrice: orderTotal,
        isPaid: false, // Will be paid via Razorpay
      });

      if (response.data.success) {
        // Navigate to Payment page with order data
        navigate('/payment', { 
          state: { 
            orderId: response.data.data._id,
            totalPrice: orderTotal,
            order: response.data.data
          } 
        });
      }
    } catch (err) {
      console.error('Order creation failed:', err);
      setError(err.response?.data?.message || 'Failed to create order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const setField = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  return (
    <>
      <BackgroundVideo videoSrc="/videos/perfume-bg.mp4" />
      <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-12 px-6 text-center" style={{ background: '#0d0b0f', borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: '#c9a45c' }}>
          Step 1 of 2
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8' }}>
          Checkout
        </motion.h1>
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {['Shipping', 'Payment', 'Confirmation'].map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold"
                  style={{ background: i === 0 ? '#c9a45c' : 'rgba(201,164,92,0.15)', color: i === 0 ? '#080608' : '#6b5f52' }}>
                  {i === 0 ? <Check size={11} /> : i + 1}
                </div>
                <span className="text-[10px] uppercase tracking-wide hidden sm:block"
                  style={{ color: i === 0 ? '#c9a45c' : '#6b5f52' }}>{step}</span>
              </div>
              {i < 2 && <div className="w-8 h-px" style={{ background: 'rgba(201,164,92,0.2)' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 pt-6">
          <div className="p-3 text-sm text-center" style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)', color: '#dc2626' }}>
            {error}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Form */}
        <div className="lg:col-span-2 space-y-10">
          {/* Contact */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h2 className="text-xs uppercase tracking-widest mb-6" style={{ color: '#c9a45c' }}>Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={LABEL_STYLE}>First Name *</label>
                <input required value={form.firstName} onChange={setField('firstName')} style={INPUT_STYLE}
                  onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Last Name *</label>
                <input required value={form.lastName} onChange={setField('lastName')} style={INPUT_STYLE}
                  onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Email Address *</label>
                <input type="email" required value={form.email} onChange={setField('email')} style={INPUT_STYLE}
                  onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
              </div>
              <div>
                <label style={LABEL_STYLE}>Phone Number</label>
                <input type="tel" value={form.phone} onChange={setField('phone')} style={INPUT_STYLE}
                  onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
              </div>
            </div>
          </motion.div>

          {/* Shipping Address */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-xs uppercase tracking-widest mb-6" style={{ color: '#c9a45c' }}>Shipping Address</h2>
            <div className="space-y-4">
              <div>
                <label style={LABEL_STYLE}>Street Address *</label>
                <input required value={form.address} onChange={setField('address')} style={INPUT_STYLE}
                  onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                  onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label style={LABEL_STYLE}>City *</label>
                  <input required value={form.city} onChange={setField('city')} style={INPUT_STYLE}
                    onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>State / Province</label>
                  <input value={form.state} onChange={setField('state')} style={INPUT_STYLE}
                    onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
                </div>
                <div>
                  <label style={LABEL_STYLE}>ZIP / Postal Code *</label>
                  <input required value={form.zip} onChange={setField('zip')} style={INPUT_STYLE}
                    onFocus={(e) => (e.target.style.borderColor = '#c9a45c')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(201,164,92,0.25)')} />
                </div>
              </div>
              <div>
                <label style={LABEL_STYLE}>Country</label>
                <select value={form.country} onChange={setField('country')}
                  style={{ ...INPUT_STYLE, background: '#0d0b0f', cursor: 'pointer' }}>
                  {['United States', 'United Kingdom', 'France', 'Germany', 'Japan', 'Australia', 'Canada', 'India', 'UAE'].map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Delivery Options */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <h2 className="text-xs uppercase tracking-widest mb-6" style={{ color: '#c9a45c' }}>Delivery Method</h2>
            <div className="space-y-3">
              {deliveryOptions.map(({ id, label, subtitle, price, icon: Icon }) => (
                <label key={id} className="flex items-center gap-4 p-4 cursor-pointer transition-all duration-200"
                  style={{
                    border: `1px solid ${delivery === id ? '#c9a45c' : 'rgba(201,164,92,0.15)'}`,
                    background: delivery === id ? 'rgba(201,164,92,0.05)' : 'transparent',
                  }}>
                  <input type="radio" name="delivery" value={id} checked={delivery === id}
                    onChange={() => setDelivery(id)} className="sr-only" />
                  <div className="w-8 h-8 flex items-center justify-center rounded-full"
                    style={{ background: delivery === id ? 'rgba(201,164,92,0.15)' : 'rgba(201,164,92,0.05)', color: '#c9a45c' }}>
                    <Icon size={15} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: '#f5f0e8' }}>{label}</p>
                    <p className="text-xs" style={{ color: '#8a7a6a' }}>{subtitle}</p>
                  </div>
                  <span className="text-sm" style={{ color: '#c9a45c' }}>
                    {price === 0 ? 'Free' : `$${price}`}
                  </span>
                  {delivery === id && (
                    <div className="w-4 h-4 rounded-full flex items-center justify-center"
                      style={{ background: '#c9a45c' }}>
                      <Check size={10} style={{ color: '#080608' }} />
                    </div>
                  )}
                </label>
              ))}
            </div>
          </motion.div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full py-4 text-xs uppercase tracking-widest font-semibold transition-all duration-300 hover:opacity-90 disabled:opacity-50"
            style={{ background: '#c9a45c', color: '#080608' }}
            disabled={loading || state.items.length === 0}
          >
            {loading ? (
              <Loader2 className="animate-spin mx-auto" size={20} />
            ) : (
              'Continue to Payment'
            )}
          </motion.button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="sticky top-24 p-6 space-y-5"
            style={{ background: '#0d0b0f', border: '1px solid rgba(201,164,92,0.15)' }}
          >
            <h2 className="text-xs uppercase tracking-widest" style={{ color: '#c9a45c' }}>Order Summary</h2>

            <div className="space-y-3 pb-4" style={{ borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
              {state.items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-3">
                  <div className="w-12 h-14 flex-shrink-0 overflow-hidden" style={{ background: '#110f14' }}>
                    <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs" style={{ fontFamily: 'Playfair Display, serif', color: '#f5f0e8' }}>{item.product.name}</p>
                    <p className="text-[10px]" style={{ color: '#6b5f52' }}>Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs" style={{ color: '#c9a45c' }}>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div>
              <label style={LABEL_STYLE}>Coupon Code</label>
              <div className="flex">
                <input
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Enter code"
                  style={{ ...INPUT_STYLE, borderRight: 'none' }}
                />
                <button type="button" onClick={handleCoupon}
                  className="px-4 text-xs uppercase tracking-wide font-semibold whitespace-nowrap"
                  style={{ background: 'rgba(201,164,92,0.15)', border: '1px solid rgba(201,164,92,0.25)', color: '#c9a45c' }}>
                  Apply
                </button>
              </div>
              {couponMsg && (
                <p className="text-xs mt-2" style={{ color: couponMsg.startsWith('✓') ? '#c9a45c' : '#d4183d' }}>
                  {couponMsg}
                </p>
              )}
            </div>

            <div className="space-y-2 pt-2" style={{ borderTop: '1px solid rgba(201,164,92,0.1)' }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: '#8a7a6a' }}>Subtotal</span>
                <span style={{ color: '#f5f0e8' }}>${subtotal.toFixed(2)}</span>
              </div>
              {state.discount > 0 && (
                <div className="flex justify-between text-sm">
                  <span style={{ color: '#8a7a6a' }}>Discount</span>
                  <span style={{ color: '#c9a45c' }}>-${(subtotal * state.discount / 100).toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span style={{ color: '#8a7a6a' }}>Shipping</span>
                <span style={{ color: deliveryPrice === 0 ? '#c9a45c' : '#f5f0e8' }}>
                  {deliveryPrice === 0 ? 'Free' : `$${deliveryPrice}`}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-baseline pt-3" style={{ borderTop: '1px solid rgba(201,164,92,0.15)' }}>
              <span className="text-xs uppercase tracking-widest" style={{ color: '#8a7a6a' }}>Total</span>
              <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#c9a45c' }}>
                ${orderTotal.toFixed(2)}
              </span>
            </div>
          </motion.div>
        </div>
      </form>
      </div>
    </>
  );
}

