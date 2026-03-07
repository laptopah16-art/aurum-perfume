import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { publicProductAPI, orderAPI, userAPI } from '../services/adminApi';

const Dashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      setError('');

      console.log('Fetching dashboard stats...');

      // Fetch products count
      let productsCount = 0;
      let productsList = [];
      try {
        const productsRes = await publicProductAPI.getAll();
        console.log('Products response:', productsRes);
        // Handle response format: { success, count, data: [...] }
        productsList = productsRes?.data || productsRes?.products || productsRes || [];
        if (Array.isArray(productsList)) {
          productsCount = productsList.length;
        } else if (productsRes?.count) {
          productsCount = productsRes.count;
        }
        console.log('Products count:', productsCount);
        // Store products for preview
        setProducts(Array.isArray(productsList) ? productsList : []);
      } catch (prodErr) {
        console.error('Error fetching products:', prodErr);
        // Continue with other stats even if products fail
      }

      // Fetch orders count and calculate revenue
      let ordersCount = 0;
      let revenue = 0;
      try {
        const ordersRes = await orderAPI.getAll();
        console.log('Orders response:', ordersRes);
        // Handle various response formats
        const orders = ordersRes?.data || ordersRes?.orders || ordersRes || [];
        ordersCount = Array.isArray(orders) ? orders.length : ordersRes?.count || 0;
        revenue = Array.isArray(orders) 
          ? orders.reduce((sum, order) => sum + (order.totalPrice || 0), 0) 
          : ordersRes?.totalRevenue || 0;
        console.log('Orders count:', ordersCount, 'Revenue:', revenue);
      } catch (orderErr) {
        console.error('Error fetching orders:', orderErr);
        // Continue with other stats even if orders fail
      }

      // Fetch users count
      let usersCount = 0;
      try {
        const usersRes = await userAPI.getAll();
        console.log('Users response:', usersRes);
        const users = usersRes?.data || usersRes?.users || usersRes || [];
        usersCount = Array.isArray(users) ? users.length : usersRes?.count || 0;
        console.log('Users count:', usersCount);
      } catch (userErr) {
        console.error('Error fetching users:', userErr);
        // Continue - users might not be critical
      }

      setStats({
        products: productsCount,
        orders: ordersCount,
        users: usersCount,
        revenue: revenue,
      });
      
      console.log('Dashboard stats loaded:', { products: productsCount, orders: ordersCount, users: usersCount, revenue });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
      setError('Failed to load dashboard data. Please make sure you are logged in as admin and the server is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-xl text-yellow-500">Loading dashboard...</div>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Products',
      value: stats.products,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      ),
      color: 'bg-yellow-500',
      link: '/admin/products',
    },
    {
      title: 'Total Orders',
      value: stats.orders,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'bg-yellow-500',
      link: '/admin/orders',
    },
    {
      title: 'Total Users',
      value: stats.users,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      color: 'bg-yellow-500',
      link: '/admin/users',
    },
    {
      title: 'Total Revenue',
      value: `$${stats.revenue.toFixed(2)}`,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'bg-yellow-500',
      link: '/admin/orders',
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-yellow-500 mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link
            key={index}
            to={card.link}
            className="bg-black border border-yellow-600 rounded-lg shadow-lg p-6 hover:shadow-yellow-500/20 hover:border-yellow-500 transition-all"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-yellow-500">{card.value}</p>
              </div>
              <div className={`${card.color} p-3 rounded-full text-black`}>
                {card.icon}
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 bg-black border border-yellow-600 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-yellow-500 mb-4">Quick Actions</h2>
        <div className="flex gap-4 flex-wrap">
          <Link
            to="/admin/products/add"
            className="bg-yellow-600 hover:bg-yellow-500 text-black px-4 py-2 rounded-lg transition-colors font-medium"
          >
            Add New Product
          </Link>
          <Link
            to="/admin/orders"
            className="bg-gray-800 hover:bg-gray-700 text-yellow-500 px-4 py-2 rounded-lg transition-colors border border-yellow-600"
          >
            View Orders
          </Link>
          <Link
            to="/admin/users"
            className="bg-gray-800 hover:bg-gray-700 text-yellow-500 px-4 py-2 rounded-lg transition-colors border border-yellow-600"
          >
            View Users
          </Link>
        </div>
      </div>

      <div className="mt-8 bg-black border border-yellow-600 rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-yellow-500 mb-4">Welcome to Aurum Admin</h2>
        <p className="text-gray-400">
          Manage your perfume store from this dashboard. You can add products, manage orders, 
          and view customer information.
        </p>
      </div>

      {/* Products Preview - 8 Products */}
      <div className="mt-8 bg-black border border-yellow-600 rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-yellow-500">Products Preview</h2>
          <Link to="/admin/products" className="text-sm text-yellow-500 hover:text-yellow-400">
            View All →
          </Link>
        </div>
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.slice(0, 8).map((product) => (
              <div key={product._id} className="bg-gray-900/50 rounded-lg p-3 border border-yellow-600/30">
                <img
                  src={product.image || 'https://via.placeholder.com/100'}
                  alt={product.name}
                  className="w-full h-24 object-cover rounded mb-2"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/100'; }}
                />
                <p className="text-xs text-yellow-500 truncate">{product.name}</p>
                <p className="text-xs text-gray-400">${product.price?.toFixed(2)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-4">No products available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

