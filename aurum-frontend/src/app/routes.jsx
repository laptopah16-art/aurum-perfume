import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router';
import React from 'react';
import Root from './Root.jsx';
import Home from './pages/Home.jsx';
import ProductListing from './pages/ProductListing.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Cart from './pages/Cart.jsx';
import Checkout from './pages/Checkout.jsx';
import Payment from './pages/Payment.jsx';
import LoginSignup from './pages/LoginSignup.jsx';
import OrderConfirmation from './pages/OrderConfirmation.jsx';
import Contact from './pages/Contact.jsx';
import AboutUs from './pages/AboutUs.jsx';
import UserAccount from './pages/UserAccount.jsx';
import Orders from './pages/Orders.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Wrapper components for protected routes
const ProtectedCart = () => <ProtectedRoute><Cart /></ProtectedRoute>;
const ProtectedCheckout = () => <ProtectedRoute><Checkout /></ProtectedRoute>;
const ProtectedPayment = () => <ProtectedRoute><Payment /></ProtectedRoute>;
const ProtectedConfirmation = () => <ProtectedRoute><OrderConfirmation /></ProtectedRoute>;
const ProtectedAccount = () => <ProtectedRoute><UserAccount /></ProtectedRoute>;
const ProtectedOrders = () => <ProtectedRoute><Orders /></ProtectedRoute>;

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" Component={Root}>
      <Route index Component={Home} />
      <Route path="products" Component={ProductListing} />
      <Route path="product/:id" Component={ProductDetail} />
      <Route path="cart" Component={ProtectedCart} />
      <Route path="checkout" Component={ProtectedCheckout} />
      <Route path="payment" Component={ProtectedPayment} />
      <Route path="login" Component={LoginSignup} />
      <Route path="order-confirmation" Component={ProtectedConfirmation} />
      <Route path="account" Component={ProtectedAccount} />
      <Route path="orders" Component={ProtectedOrders} />
      <Route path="contact" Component={Contact} />
      <Route path="about" Component={AboutUs} />
    </Route>
  )
);

