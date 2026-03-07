import React from 'react';
import { Outlet } from 'react-router';
import { Layout } from './components/Layout.jsx';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext.jsx';

export default function Root() {
  return (
    <AuthProvider>
      <CartProvider>
        <Layout>
          <Outlet />
        </Layout>
      </CartProvider>
    </AuthProvider>
  );
}

