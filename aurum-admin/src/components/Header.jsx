import { useLocation } from 'react-router-dom';
import { Bell, Search, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AdminAuthContext';

const pageNames = {
  '/admin': 'Dashboard',
  '/admin/dashboard': 'Dashboard',
  '/admin/products': 'Products',
  '/admin/products/add': 'Add Product',
  '/admin/products/edit': 'Edit Product',
  '/admin/orders': 'Orders',
  '/admin/users': 'Users',
  '/admin/customers': 'Customers',
  '/admin/coupons': 'Coupons',
  '/admin/messages': 'Messages',
  '/admin/analytics': 'Analytics',
  '/admin/settings': 'Settings',
};

export default function Header() {
  const location = useLocation();
  const { admin } = useAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (admin) {
      setUser(admin);
    } else {
      const userData = JSON.parse(localStorage.getItem('adminUser') || '{}');
      setUser(userData);
    }
  }, [admin]);

  const pageName = pageNames[location.pathname] || 'Dashboard';

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-black border-b border-yellow-600 z-40">
      <div className="flex items-center justify-between h-full px-6">
        {/* Page Title */}
        <div>
          <h2 className="text-lg font-semibold text-yellow-500">{pageName}</h2>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 bg-gray-900 border border-yellow-600/30 rounded-lg text-sm text-gray-300 placeholder:text-gray-500 focus:outline-none focus:border-yellow-500 w-64"
            />
          </div>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-yellow-500 transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-yellow-500 rounded-full"></span>
          </button>

          {/* User */}
          <div className="flex items-center gap-3 pl-4 border-l border-yellow-600/30">
            <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
              <User size={16} className="text-yellow-500" />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-yellow-500">{user?.name || 'Admin'}</p>
              <p className="text-xs text-gray-400">{user?.email || 'admin@aurum.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

