# AURUM Perfume E-Commerce Project

A luxury perfume e-commerce platform built with React, Vite, Node.js, Express, and MongoDB.

## Project Structure

```
aurum-perfume/
├── aurum-frontend/    # Customer-facing e-commerce site (React + Vite) - Port 5173
├── aurum-admin/       # Admin dashboard (React + Vite) - Port 5174
└── aurum-backend/    # Express.js API server (Node.js) - Port 5000
```

## ⚠️ IMPORTANT: Prerequisites

You MUST have the following installed and running:

1. **Node.js 18+** - https://nodejs.org/
2. **MongoDB** - Must be running on port 27017
   - Windows: Install MongoDB Community Server or use MongoDB Atlas
   - macOS: `brew install mongodb-community` then `brew services start mongodb-community`
   - Or use MongoDB Atlas (cloud) - update .env with your connection string

## Quick Start

### Step 1: Start MongoDB (REQUIRED)

**Option A: Local MongoDB**
```bash
# Make sure MongoDB service is running
# Windows: Start MongoDB service
# macOS: brew services start mongodb-community
# Linux: sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
1. Create a free account at https://www.mongodb.com/atlas
2. Create a free cluster
3. Get your connection string
4. Update `.env` in aurum-backend:
```
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/aurum_perfume
```

### Step 2: Seed Admin User

```bash
cd aurum-backend
npm run seed
```

This creates:
- **Email**: admin@aurum.com
- **Password**: admin123

### Step 3: Start Backend

```bash
cd aurum-backend
npm run dev
```

The backend will run on `http://localhost:5000`

### Step 4: Start Frontend

```bash
cd aurum-frontend
npm run dev
```

The frontend will run on `http://localhost:5173`

### Step 5: Start Admin Dashboard

```bash
cd aurum-admin
npm run dev
```

The admin panel will run on `http://localhost:5174`

## Troubleshooting

### ❌ "MongoDB connection refused" error

**Cause**: MongoDB is not running

**Solution**:
1. Start MongoDB service on your machine, OR
2. Use MongoDB Atlas (cloud) and update .env

### ❌ Products not showing on homepage

**Cause**: Products not seeded

**Solution**: 
- Backend auto-seeds 8 products on first run when MongoDB is connected
- Or run: `cd aurum-backend && npm run seed-products`

### ❌ Admin login fails

**Cause**: Admin user not created

**Solution**: 
```bash
cd aurum-backend
npm run seed
```

### ❌ Network errors in console

**Cause**: Backend not running or wrong port

**Solution**:
1. Make sure backend is running on port 5000
2. Check CORS settings in backend server.js

## API Endpoints

### Products
- `GET /api/products` - Get all products (public)
- `GET /api/products/:id` - Get single product (public)
- `GET /api/products/categories` - Get categories
- `GET /api/products/best-sellers` - Get best sellers
- `GET /api/products/new-arrivals` - Get new arrivals
- `POST /api/products` - Create product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `POST /api/users/google` - Google login
- `GET /api/users/profile` - Get profile

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all messages (admin only)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders

## Environment Variables

### Backend (aurum-backend/.env)
```
MONGODB_URI=mongodb://localhost:27017/aurum_perfume
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (aurum-frontend/.env)
```
VITE_API_URL=http://localhost:5000/api
```

## Features

### Frontend (http://localhost:5173)
- ✅ Home page with exactly 8 products displayed
- ✅ Product listing with filters
- ✅ Product detail page
- ✅ Shopping cart
- ✅ User authentication (login/signup with Google)
- ✅ Contact form

### Admin Dashboard (http://localhost:5174)
- ✅ Admin login (admin@aurum.com / admin123)
- ✅ Dashboard with overview
- ✅ Product management (CRUD)
- ✅ Contact messages viewing
- ✅ Protected routes

## Code Overview

### Home Page - Displaying 8 Products
The Home page displays exactly 8 products in two sections:
- Featured Fragrances: products.slice(0, 4)
- New Arrivals: products.slice(4, 8)

Total: 8 products displayed on homepage.

### Product API Response Format
```json
{
  "success": true,
  "count": 8,
  "totalPages": 1,
  "currentPage": 1,
  "data": [
    {
      "_id": "...",
      "name": "Noir Absolu",
      "brand": "AURUM",
      "price": 285,
      "image": "https://...",
      "isBestSeller": true,
      "isNewArrival": false
    }
  ]
}
```

## Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, React Router, Framer Motion
- **Admin**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Authentication**: JWT, bcrypt

