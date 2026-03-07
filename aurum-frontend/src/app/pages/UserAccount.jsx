import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { User, Package, MapPin, LogOut, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { orderAPI } from '../../services/api';
import BackgroundVideo from '../components/BackgroundVideo';

const UserAccount = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    // Fetch user orders
    const fetchOrders = async () => {
      try {
        const response = await orderAPI.getMyOrders();
        setOrders(response.data.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoadingOrders(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'text-green-500';
      case 'shipped':
        return 'text-blue-500';
      case 'processing':
        return 'text-yellow-500';
      case 'cancelled':
        return 'text-red-500';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <>
      <BackgroundVideo videoSrc="/videos/perfume-bg.mp4" />
      <div style={{ background: 'transparent', minHeight: '100vh', paddingTop: '100px', paddingBottom: '50px' }}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.5rem', color: '#c9a45c' }}>
            My Account
          </h1>
          <p style={{ color: '#8a7a6a' }}>Welcome back, {user?.name}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,164,92,0.2)', borderRadius: '8px', padding: '20px' }}>
              {/* User Info */}
              <div className="flex items-center gap-4 mb-6 pb-6" style={{ borderBottom: '1px solid rgba(201,164,92,0.1)' }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ background: 'rgba(201,164,92,0.1)' }}>
                  {user?.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User size={32} style={{ color: '#c9a45c' }} />
                  )}
                </div>
                <div>
                  <h3 style={{ color: '#f5f0e8', fontWeight: 500 }}>{user?.name}</h3>
                  <p style={{ color: '#8a7a6a', fontSize: '0.85rem' }}>{user?.email}</p>
                </div>
              </div>

              {/* Menu Items */}
              <nav className="space-y-2">
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all"
                  style={{ background: 'rgba(201,164,92,0.1)', color: '#c9a45c', borderRadius: '4px' }}
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:opacity-70"
                  style={{ color: '#8a7a6a' }}
                  onClick={() => navigate('/orders')}
                >
                  <Package size={18} />
                  <span>Orders</span>
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:opacity-70"
                  style={{ color: '#8a7a6a' }}
                >
                  <MapPin size={18} />
                  <span>Addresses</span>
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all hover:opacity-70"
                  style={{ color: '#dc2626' }}
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,164,92,0.2)', borderRadius: '8px', padding: '24px' }}
            >
              <h2 style={{ color: '#f5f0e8', fontSize: '1.25rem', marginBottom: '20px' }}>Profile Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: '#8a7a6a', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Full Name</label>
                  <p style={{ color: '#f5f0e8', marginTop: '4px' }}>{user?.name}</p>
                </div>
                <div>
                  <label style={{ color: '#8a7a6a', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email Address</label>
                  <p style={{ color: '#f5f0e8', marginTop: '4px' }}>{user?.email}</p>
                </div>
                <div>
                  <label style={{ color: '#8a7a6a', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</label>
                  <p style={{ color: '#f5f0e8', marginTop: '4px' }}>{user?.phone || 'Not set'}</p>
                </div>
                <div>
                  <label style={{ color: '#8a7a6a', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Account Type</label>
                  <p style={{ color: '#c9a45c', marginTop: '4px', textTransform: 'capitalize' }}>{user?.role}</p>
                </div>
              </div>
            </motion.div>

            {/* Order History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(201,164,92,0.2)', borderRadius: '8px', padding: '24px' }}
            >
              <h2 style={{ color: '#f5f0e8', fontSize: '1.25rem', marginBottom: '20px' }}>Order History</h2>
              
              {loadingOrders ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="animate-spin" style={{ color: '#c9a45c' }} size={24} />
                </div>
              ) : orders.length === 0 ? (
                <p style={{ color: '#8a7a6a', textAlign: 'center', padding: '20px' }}>No orders yet</p>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div
                      key={order._id}
                      style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(201,164,92,0.1)', borderRadius: '8px', padding: '16px' }}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p style={{ color: '#f5f0e8', fontWeight: 500 }}>Order #{order._id.slice(-8)}</p>
                          <p style={{ color: '#8a7a6a', fontSize: '0.85rem' }}>{formatDate(order.createdAt)}</p>
                        </div>
                        <span className={getStatusColor(order.status)} style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>
                          {order.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p style={{ color: '#8a7a6a', fontSize: '0.85rem' }}>{order.orderItems?.length || 0} items</p>
                        </div>
                        <p style={{ color: '#c9a45c', fontWeight: 500 }}>₹{order.totalPrice?.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default UserAccount;

