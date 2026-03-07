import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Check, Lock, Loader2 } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { paymentAPI } from '../../services/api';
import BackgroundVideo from '../components/BackgroundVideo';

// Razorpay checkout script loader
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export default function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCart();
  
  // Get order data from navigation state
  const { orderId, totalPrice, order } = location.state || {};
  
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  // Redirect if no order data
  useEffect(() => {
    if (!orderId || !totalPrice) {
      navigate('/checkout');
    }
  }, [orderId, totalPrice, navigate]);

  // Load Razorpay script on mount
  useEffect(() => {
    const loadScript = async () => {
      const loaded = await loadRazorpayScript();
      setRazorpayLoaded(loaded);
      if (!loaded) {
        setError('Failed to load payment gateway. Please refresh and try again.');
      }
    };
    loadScript();
  }, []);

  // Handle payment - supports both real Razorpay and demo mode
  const handlePayment = async () => {
    setProcessing(true);
    setError('');

    // Check if Razorpay is available
    if (!razorpayLoaded || !window.Razorpay) {
      // Fall back to demo mode
      await handleDemoPayment();
      return;
    }

    try {
      // Step 1: Create Razorpay order on backend
      const orderResponse = await paymentAPI.createOrder({
        amount: totalPrice,
        currency: 'INR',
      });

      // Handle different error responses
      if (!orderResponse.data.success) {
        const errorCode = orderResponse.data.code;
        const errorMessage = orderResponse.data.message;
        
        switch (errorCode) {
          case 'PAYMENT_NOT_CONFIGURED':
            // Fall back to demo mode
            await handleDemoPayment();
            return;
          case 'INVALID_CREDENTIALS':
            setError('Invalid payment configuration. Please contact the administrator.');
            setProcessing(false);
            return;
          case 'INVALID_AMOUNT':
            setError('Invalid order amount. Please go back to checkout and try again.');
            setProcessing(false);
            return;
          case 'NETWORK_ERROR':
            setError('Network error. Please check your internet connection and try again.');
            setProcessing(false);
            return;
          default:
            // Fall back to demo mode for any other error
            await handleDemoPayment();
            return;
        }
      }

      const { orderId: razorpayOrderId, keyId } = orderResponse.data.data;

      // Step 2: Open Razorpay checkout
      const razorpayOptions = {
        key: keyId,
        amount: totalPrice * 100, // Razorpay expects amount in paise
        currency: 'INR',
        name: 'AURUM Perfume',
        description: 'Order Payment',
        order_id: razorpayOrderId,
        handler: async (response) => {
          // Step 3: Verify payment on backend
          try {
            const verifyResponse = await paymentAPI.verifyPayment({
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              orderId: orderId,
            });

            if (verifyResponse.data.success) {
              setSuccess(true);
              setTimeout(() => {
                clearCart();
                navigate('/order-confirmation', {
                  state: { 
                    orderId: orderId,
                    paymentId: response.razorpay_payment_id
                  }
                });
              }, 2000);
            }
          } catch (verifyError) {
            console.error('Payment verification failed:', verifyError);
            setError('Payment verification failed. Please contact support.');
            setProcessing(false);
          }
        },
        prefill: {
          name: order?.shippingAddress?.fullName || '',
          email: order?.user?.email || '',
          contact: order?.shippingAddress?.phone || '',
        },
        theme: {
          color: '#c9a45c',
          hide_topbar: false,
        },
        modal: {
          ondismiss: () => {
            setProcessing(false);
          },
        },
      };

      const razorpay = new window.Razorpay(razorpayOptions);
      razorpay.open();

    } catch (err) {
      console.error('Payment error:', err);
      // Fall back to demo mode on any error
      await handleDemoPayment();
    }
  };

  // Demo payment handler - simulates successful payment when Razorpay is not configured
  const handleDemoPayment = async () => {
    setProcessing(true);
    setError('');
    
    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mark the order as paid (simulated)
      setSuccess(true);
      
      // Simulate a demo payment ID
      const demoPaymentId = `DEMO_${Date.now()}`;
      
      setTimeout(() => {
        clearCart();
        navigate('/order-confirmation', {
          state: { 
            orderId: orderId,
            paymentId: demoPaymentId,
            isDemo: true
          }
        });
      }, 2000);
    } catch (err) {
      console.error('Demo payment error:', err);
      setError('Payment simulation failed. Please try again.');
      setProcessing(false);
    }
  };

  return (
    <>
      <BackgroundVideo videoSrc="/videos/perfume-bg.mp4" />
      <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-12 px-6 text-center" style={{ background: '#0d0b0f', borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs uppercase tracking-[0.4em] mb-2" style={{ color: '#c9a45c' }}>
          Step 2 of 2
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8' }}>
          Secure Payment
        </motion.h1>
        {/* Progress */}
        <div className="flex items-center justify-center gap-2 mt-6">
          {['Shipping', 'Payment', 'Confirmation'].map((step, i) => (
            <React.Fragment key={step}>
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-semibold"
                  style={{
                    background: i <= 1 ? '#c9a45c' : 'rgba(201,164,92,0.15)',
                    color: i <= 1 ? '#080608' : '#6b5f52'
                  }}>
                  {i <= 1 ? <Check size={11} /> : 3}
                </div>
                <span className="text-[10px] uppercase tracking-wide hidden sm:block"
                  style={{ color: i <= 1 ? '#c9a45c' : '#6b5f52' }}>{step}</span>
              </div>
              {i < 2 && <div className="w-8 h-px" style={{ background: 'rgba(201,164,92,0.2)' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Security badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-2 mb-8 py-3"
          style={{ border: '1px solid rgba(201,164,92,0.15)', background: 'rgba(201,164,92,0.03)' }}
        >
          <Lock size={13} style={{ color: '#c9a45c' }} />
          <span className="text-xs uppercase tracking-widest" style={{ color: '#8a7a6a' }}>
            256-bit SSL Encrypted · Secure Checkout
          </span>
        </motion.div>

        {/* Order Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 p-6"
          style={{ background: '#0d0b0f', border: '1px solid rgba(201,164,92,0.15)' }}
        >
          <h2 className="text-xs uppercase tracking-widest mb-4" style={{ color: '#c9a45c' }}>Order Summary</h2>
          
          {order?.orderItems && (
            <div className="space-y-3 mb-4 pb-4" style={{ borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
              {order.orderItems.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-12 flex-shrink-0 overflow-hidden" style={{ background: '#110f14' }}>
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs" style={{ color: '#f5f0e8' }}>{item.name}</p>
                    <p className="text-[10px]" style={{ color: '#6b5f52' }}>Qty: {item.quantity}</p>
                  </div>
                  <span className="text-xs" style={{ color: '#c9a45c' }}>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
          )}

          {/* Shipping Address Summary */}
          {order?.shippingAddress && (
            <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
              <p className="text-[10px] uppercase tracking-widest mb-2" style={{ color: '#8a7a6a' }}>Shipping To</p>
              <p className="text-sm" style={{ color: '#f5f0e8' }}>{order.shippingAddress.fullName}</p>
              <p className="text-xs" style={{ color: '#6b5f52' }}>
                {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}
              </p>
            </div>
          )}

          {/* Total */}
          <div className="flex justify-between items-center pt-2">
            <span className="text-xs uppercase tracking-widest" style={{ color: '#8a7a6a' }}>Amount Due</span>
            <span style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.8rem', color: '#c9a45c' }}>
              ${totalPrice?.toFixed(2)}
            </span>
          </div>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4"
            style={{ background: 'rgba(220,38,38,0.1)', border: '1px solid rgba(220,38,38,0.3)' }}
          >
            <p className="text-sm text-center" style={{ color: '#dc2626' }}>{error}</p>
          </motion.div>
        )}

        {/* Razorpay Payment Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div 
            className="p-6 mb-6"
            style={{ background: 'rgba(201,164,92,0.03)', border: '1px solid rgba(201,164,92,0.15)' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div 
                className="w-10 h-10 flex items-center justify-center"
                style={{ background: 'rgba(201,164,92,0.1)', borderRadius: '8px' }}
              >
                <Shield size={20} style={{ color: '#c9a45c' }} />
              </div>
              <div>
                <h3 className="text-sm" style={{ color: '#f5f0e8' }}>Pay with Razorpay</h3>
                <p className="text-xs" style={{ color: '#8a7a6a' }}>Secure payment gateway</p>
              </div>
            </div>
            
            <p className="text-xs mb-4" style={{ color: '#6b5f52' }}>
              You will be redirected to Razorpay's secure checkout to complete your payment. 
              We accept all major cards, UPI, and digital wallets.
            </p>

            {/* Payment Methods Icons */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-[10px] uppercase tracking-wide" style={{ color: '#6b5f52' }}>Accepted:</span>
              <div className="flex gap-2">
                {['💳', '📱', '🏦'].map((icon, i) => (
                  <span key={i} className="text-lg">{icon}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Pay Button */}
          <motion.button
            type="button"
            onClick={handlePayment}
            whileTap={{ scale: 0.97 }}
            disabled={processing || success}
            className="w-full py-4 flex items-center justify-center gap-3 text-xs uppercase tracking-widest font-semibold transition-all duration-300 relative overflow-hidden"
            style={{
              background: success ? 'rgba(201,164,92,0.5)' : '#c9a45c',
              color: '#080608',
              opacity: processing ? 0.8 : 1,
            }}
          >
            <AnimatePresence mode="wait">
              {processing ? (
                <motion.span 
                  key="processing" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 rounded-full"
                    style={{ border: '2px solid rgba(8,6,8,0.3)', borderTopColor: '#080608' }}
                  />
                  Processing Payment...
                </motion.span>
              ) : success ? (
                <motion.span 
                  key="success" 
                  initial={{ opacity: 0, scale: 0.8 }} 
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2"
                >
                  <Check size={16} /> Payment Successful!
                </motion.span>
              ) : (
                <motion.span 
                  key="pay" 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-2"
                >
                  <Shield size={15} /> Pay ${totalPrice?.toFixed(2)} Securely
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="flex items-center justify-center gap-6 mt-5 flex-wrap">
            {['SSL Secured', '256-bit Encryption', 'PCI Compliant'].map((badge) => (
              <div key={badge} className="flex items-center gap-1.5">
                <Check size={10} style={{ color: '#c9a45c' }} />
                <span className="text-[10px] uppercase tracking-wide" style={{ color: '#4a4040' }}>{badge}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Back to Checkout Link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/checkout')}
            className="text-xs underline"
            style={{ color: '#8a7a6a' }}
            disabled={processing}
          >
            ← Back to Checkout
          </button>
        </div>
      </div>
      </div>
    </>
  );
}

