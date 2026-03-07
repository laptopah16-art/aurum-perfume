import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { Package, ChevronRight, ChevronLeft, MapPin, CreditCard, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../../services/api';
import BackgroundVideo from '../components/BackgroundVideo';

export default function Orders() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await orderAPI.getMyOrders();
        setOrders(response.data.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'delivered':
        return { bg: 'rgba(34, 197, 94, 0.1)', border: 'rgba(34, 197, 94, 0.3)', text: '#22c55e' };
      case 'shipped':
        return { bg: 'rgba(59, 130, 246, 0.1)', border: 'rgba(59, 130, 246, 0.3)', text: '#3b82f6' };
      case 'processing':
        return { bg: 'rgba(201, 164, 92, 0.1)', border: 'rgba(201, 164, 92, 0.3)', text: '#c9a45c' };
      case 'cancelled':
        return { bg: 'rgba(220, 38, 38, 0.1)', border: 'rgba(220, 38, 38, 0.3)', text: '#dc2626' };
      default:
        return { bg: 'rgba(107, 114, 128, 0.1)', border: 'rgba(107, 114, 128, 0.3)', text: '#6b7280' };
    }
  };

  if (loading) {
    return (
      <>
        <BackgroundVideo videoSrc="/videos/perfume-bg.mp4" />
        <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-2 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BackgroundVideo videoSrc="/videos/perfume-bg.mp4" />
      <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '80px' }}>
      {/* Header */}
      <div className="py-12 px-6 text-center" style={{ background: '#0d0b0f', borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
        <motion.p 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-xs uppercase tracking-[0.4em] mb-2" 
          style={{ color: '#c9a45c' }}
        >
          Your Orders
        </motion.p>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: '#f5f0e8' }}
        >
          Order History
        </motion.h1>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Back to Account */}
        <button
          onClick={() => navigate('/account')}
          className="flex items-center gap-2 mb-6 text-sm transition-opacity hover:opacity-70"
          style={{ color: '#8a7a6a' }}
        >
          <ChevronLeft size={16} />
          Back to Account
        </button>

        {orders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
            style={{ background: '#0d0b0f', border: '1px solid rgba(201,164,92,0.15)' }}
          >
            <Package size={48} style={{ color: '#4a4040', margin: '0 auto 16px' }} />
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: '1.5rem', color: '#f5f0e8', marginBottom: '8px' }}>
              No Orders Yet
            </h2>
            <p style={{ color: '#6b5f52', marginBottom: '24px' }}>
              You haven't placed any orders yet.
            </p>
            <button
              onClick={() => navigate('/products')}
              className="px-6 py-3 text-xs uppercase tracking-widest font-semibold"
              style={{ background: '#c9a45c', color: '#080608' }}
            >
              Start Shopping
            </button>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {orders.map((order, index) => {
              const statusColors = getStatusColor(order.orderStatus);
              return (
                <motion.div
                  key={order._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ background: '#0d0b0f', border: '1px solid rgba(201,164,92,0.15)' }}
                >
                  {/* Order Header */}
                  <div 
                    className="p-4 flex items-center justify-between cursor-pointer"
                    style={{ borderBottom: selectedOrder === order._id ? 'none' : '1px solid rgba(201,164,92,0.1)' }}
                    onClick={() => setSelectedOrder(selectedOrder === order._id ? null : order._id)}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-10 h-10 flex items-center justify-center"
                        style={{ background: 'rgba(201,164,92,0.1)', borderRadius: '8px' }}
                      >
                        <Package size={20} style={{ color: '#c9a45c' }} />
                      </div>
                      <div>
                        <h3 className="text-sm font-medium" style={{ color: '#f5f0e8' }}>
                          Order #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-xs" style={{ color: '#6b5f52' }}>
                          {formatDate(order.createdAt)} · {order.orderItems?.length || 0} items
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span 
                        className="px-3 py-1 text-xs uppercase tracking-wide"
                        style={{ 
                          background: statusColors.bg, 
                          border: `1px solid ${statusColors.border}`, 
                          color: statusColors.text 
                        }}
                      >
                        {order.orderStatus || 'Processing'}
                      </span>
                      <div style={{ color: '#c9a45c' }}>
                        {selectedOrder === order._id ? <ChevronUp size={20} /> : <ChevronRight size={20} />}
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  {selectedOrder === order._id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="p-4"
                      style={{ borderTop: '1px solid rgba(201,164,92,0.1)' }}
                    >
                      {/* Order Items */}
                      <div className="mb-4 pb-4" style={{ borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
                        <h4 className="text-xs uppercase tracking-widest mb-3" style={{ color: '#8a7a6a' }}>Items</h4>
                        <div className="space-y-3">
                          {order.orderItems?.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3">
                              <div 
                                className="w-12 h-12 flex-shrink-0 overflow-hidden"
                                style={{ background: '#110f14' }}
                              >
                                <img 
                                  src={item.image} 
                                  alt={item.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm" style={{ color: '#f5f0e8' }}>{item.name}</p>
                                <p className="text-xs" style={{ color: '#6b5f52' }}>Qty: {item.quantity}</p>
                              </div>
                              <span className="text-sm" style={{ color: '#c9a45c' }}>
                                ${(item.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Shipping & Payment Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Shipping Address */}
                        <div>
                          <h4 className="text-xs uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: '#8a7a6a' }}>
                            <MapPin size={12} /> Shipping Address
                          </h4>
                          <p className="text-sm" style={{ color: '#c8bcae' }}>
                            {order.shippingAddress?.fullName}<br />
                            {order.shippingAddress?.addressLine1}<br />
                            {order.shippingAddress?.city}, {order.shippingAddress?.state} {order.shippingAddress?.postalCode}
                          </p>
                        </div>

                        {/* Payment Info */}
                        <div>
                          <h4 className="text-xs uppercase tracking-widest mb-2 flex items-center gap-2" style={{ color: '#8a7a6a' }}>
                            <CreditCard size={12} /> Payment Summary
                          </h4>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span style={{ color: '#6b5f52' }}>Subtotal</span>
                              <span style={{ color: '#c8bcae' }}>${(order.totalPrice - (order.shippingCost || 0)).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span style={{ color: '#6b5f52' }}>Shipping</span>
                              <span style={{ color: '#c8bcae' }}>${(order.shippingCost || 0).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm pt-2" style={{ borderTop: '1px solid rgba(201,164,92,0.1)' }}>
                              <span style={{ color: '#c9a45c', fontWeight: 500 }}>Total</span>
                              <span style={{ color: '#c9a45c', fontWeight: 500 }}>${order.totalPrice?.toFixed(2)}</span>
                            </div>
                          </div>
                          <div className="mt-3 flex items-center gap-2">
                            <Check size={14} style={{ color: '#22c55e' }} />
                            <span className="text-xs" style={{ color: '#22c55e' }}>
                              {order.isPaid ? 'Payment Verified' : 'Payment Pending'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
      </div>
    </>
  );
}

