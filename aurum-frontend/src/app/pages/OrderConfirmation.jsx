import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Check, Package, Truck, Home, ArrowRight } from 'lucide-react';
import confirmationVideo from '../../assets/10536903-uhd_4096_2160_25fps.mp4';

const ORDER_ID = `AUR-${Math.floor(100000 + Math.random() * 900000)}`;

export default function OrderConfirmation() {
  const [orderNum] = useState(ORDER_ID);

  const steps = [
    { icon: Check, label: 'Order Confirmed', done: true },
    { icon: Package, label: 'Processing', done: false },
    { icon: Truck, label: 'Shipped', done: false },
    { icon: Home, label: 'Delivered', done: false },
  ];

  return (
    <div style={{ background: '#080608', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Background Video */}
      <div className="fixed inset-0 z-0">
        <video 
          src={confirmationVideo} 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover video-grayscale"
        />
        <div className="absolute inset-0" style={{ background: 'rgba(8,6,8,0.85)' }} />
      </div>
      
      <div className="relative z-10 max-w-2xl mx-auto px-6 py-20 text-center">
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
          className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8"
          style={{
            background: 'rgba(201,164,92,0.1)',
            border: '2px solid rgba(201,164,92,0.4)',
          }}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 300 }}
          >
            <Check size={40} style={{ color: '#c9a45c' }} />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs uppercase tracking-[0.4em] mb-3" style={{ color: '#c9a45c' }}>
            Thank You
          </p>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 400, color: '#f5f0e8', lineHeight: 1.2 }}>
            Your Order is<br /><em style={{ color: '#c9a45c' }}>Confirmed</em>
          </h1>
          <p className="mt-4 text-sm" style={{ color: '#8a7a6a' }}>
            Thank you for choosing AURUM. Your exceptional fragrance will be prepared with the utmost care and delivered to your door.
          </p>
        </motion.div>

        {/* Order Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 p-6"
          style={{ background: '#0d0b0f', border: '1px solid rgba(201,164,92,0.15)' }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6 pb-6"
            style={{ borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#6b5f52' }}>Order Number</p>
              <p className="text-sm font-mono" style={{ color: '#c9a45c' }}>{orderNum}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#6b5f52' }}>Order Date</p>
              <p className="text-sm" style={{ color: '#f5f0e8' }}>
                {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: '#6b5f52' }}>Est. Delivery</p>
              <p className="text-sm" style={{ color: '#f5f0e8' }}>5–7 Business Days</p>
            </div>
          </div>

          {/* Order Tracker */}
          <div className="relative flex items-center justify-between">
            {/* Line */}
            <div className="absolute top-4 left-4 right-4 h-px" style={{ background: 'rgba(201,164,92,0.15)' }} />
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '25%' }}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute top-4 left-4 h-px"
              style={{ background: '#c9a45c' }}
            />

            {steps.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.1 }}
                className="relative flex flex-col items-center gap-2 z-10"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: step.done ? '#c9a45c' : '#110f14',
                    border: step.done ? '2px solid #c9a45c' : '2px solid rgba(201,164,92,0.2)',
                  }}
                >
                  <step.icon size={14} style={{ color: step.done ? '#080608' : '#4a4040' }} />
                </div>
                <p className="text-[10px] uppercase tracking-wide text-center" style={{ color: step.done ? '#c9a45c' : '#4a4040' }}>
                  {step.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Confirmation email notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-6 p-4 text-sm"
          style={{ background: 'rgba(201,164,92,0.05)', border: '1px solid rgba(201,164,92,0.1)' }}
        >
          <p style={{ color: '#8a7a6a' }}>
            A confirmation email has been sent to your registered email address. Please keep it for your records.
          </p>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 mt-10 justify-center"
        >
          <Link
            to="/products"
            className="flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-widest font-semibold"
            style={{ background: '#c9a45c', color: '#080608' }}
          >
            Continue Shopping <ArrowRight size={14} />
          </Link>
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-8 py-4 text-xs uppercase tracking-widest"
            style={{ border: '1px solid rgba(201,164,92,0.3)', color: '#c9a45c' }}
          >
            Return to Home
          </Link>
        </motion.div>

        {/* Gift message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-16 text-center"
        >
          <div className="w-10 h-px mx-auto mb-5" style={{ background: 'rgba(201,164,92,0.3)' }} />
          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontStyle: 'italic', color: '#6b5f52' }}>
            "Every great fragrance begins with a single perfect drop."
          </p>
          <p className="text-xs uppercase tracking-widest mt-2" style={{ color: '#4a4040' }}>— AURUM, Paris</p>
        </motion.div>
      </div>
    </div>
  );
}

