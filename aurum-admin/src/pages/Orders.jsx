import { useState, useEffect } from 'react';
import { orderAPI } from '../services/adminApi';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await orderAPI.getAll();
      const data = response.data || response.orders || response || [];
      
      setOrders(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError('Failed to fetch orders. Please make sure you are logged in.');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await orderAPI.updateStatus(orderId, status);
      setOrders(orders.map((order) =>
        order._id === orderId ? { ...order, orderStatus: status } : order
      ));
      alert('Order status updated!');
    } catch (err) {
      console.error('Error updating order:', err);
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-900/50 text-yellow-400 border border-yellow-600',
      processing: 'bg-blue-900/50 text-blue-400 border border-blue-600',
      shipped: 'bg-purple-900/50 text-purple-400 border border-purple-600',
      delivered: 'bg-green-900/50 text-green-400 border border-green-600',
      cancelled: 'bg-red-900/50 text-red-400 border border-red-600',
    };
    return colors[status?.toLowerCase()] || 'bg-gray-900/50 text-gray-400 border border-gray-600';
  };

  // Loading spinner component
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center h-64">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-yellow-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
      <span className="ml-4 text-yellow-500">Loading orders...</span>
    </div>
  );

  if (loading) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-yellow-500 mb-6">Orders Management</h1>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">Orders Management</h1>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
          <button 
            onClick={fetchOrders}
            className="ml-4 text-red-300 underline hover:text-red-100"
          >
            Try Again
          </button>
        </div>
      )}

      <div className="bg-black border border-yellow-600 rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-yellow-600/30">
            <thead className="bg-gray-900">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-yellow-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-black divide-y divide-yellow-600/30">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-400">
                    No orders found
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-900/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-yellow-500">
                        {order._id?.substring(0, 8)}...
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-yellow-500">
                        {order.shippingAddress?.fullName || order.user?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.shippingAddress?.email || order.user?.email || ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-yellow-500">
                        ${order.totalPrice?.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus || order.status)}`}>
                        {order.orderStatus || order.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-yellow-500 hover:text-yellow-400"
                        >
                          View
                        </button>
                        <select
                          value={order.orderStatus || order.status || 'pending'}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="ml-2 text-sm border border-yellow-600 bg-gray-900 text-gray-300 rounded px-2 py-1 focus:outline-none focus:border-yellow-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-black border border-yellow-600 rounded-lg shadow-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-yellow-500">Order Details</h2>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 hover:text-yellow-500"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-yellow-500">Order Information</h3>
                <p className="text-sm text-gray-400">Order ID: {selectedOrder._id}</p>
                <p className="text-sm text-gray-400">Date: {new Date(selectedOrder.createdAt).toLocaleString()}</p>
                <p className="text-sm text-gray-400">
                  Status: <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(selectedOrder.orderStatus || selectedOrder.status)}`}>
                    {selectedOrder.orderStatus || selectedOrder.status || 'Pending'}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-500">Customer Information</h3>
                <p className="text-sm text-gray-400">Name: {selectedOrder.shippingAddress?.fullName || selectedOrder.user?.name}</p>
                <p className="text-sm text-gray-400">Email: {selectedOrder.shippingAddress?.email || selectedOrder.user?.email}</p>
                <p className="text-sm text-gray-400">Phone: {selectedOrder.shippingAddress?.phone || 'N/A'}</p>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-500">Shipping Address</h3>
                <p className="text-sm text-gray-400">
                  {selectedOrder.shippingAddress?.address}, 
                  {selectedOrder.shippingAddress?.city}, 
                  {selectedOrder.shippingAddress?.postalCode}
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-yellow-500">Order Items</h3>
                <div className="mt-2">
                  {selectedOrder.orderItems?.map((item, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-yellow-600/30">
                      <div>
                        <p className="text-sm font-medium text-yellow-500">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm text-yellow-500">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-4 font-bold">
                  <span className="text-yellow-500">Total:</span>
                  <span className="text-yellow-500">${selectedOrder.totalPrice?.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;

