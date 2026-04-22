# 🌟 AURUM Perfume – Luxury E-Commerce Platform

A full-stack luxury perfume e-commerce application built using **React, Vite, Node.js, Express, and MongoDB**.

---

## 🚀 Live Overview

* 🛍️ Frontend → http://localhost:5173
* 🛠️ Admin Panel → http://localhost:5174
* 🔗 Backend API → http://localhost:5000

---

## 📁 Project Structure

```
aurum-perfume/
├── aurum-frontend/   # Customer-facing app (React + Vite)
├── aurum-admin/      # Admin dashboard (React + Vite)
└── aurum-backend/    # Backend API (Node.js + Express)
```

---

## ⚙️ Prerequisites

Make sure you have installed:

* Node.js (v18+)
* MongoDB (Local or Atlas)

### MongoDB Setup

**Option 1: Local**

```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

**Option 2: MongoDB Atlas**

1. Create account → https://www.mongodb.com/atlas
2. Create cluster
3. Replace connection string in `.env`

---

## ⚡ Quick Start

### 1️⃣ Backend Setup

```bash
cd aurum-backend
npm install
npm run seed
npm run dev
```

Backend runs on → http://localhost:5000

---

### 2️⃣ Frontend Setup

```bash
cd aurum-frontend
npm install
npm run dev
```

Frontend runs on → http://localhost:5173

---

### 3️⃣ Admin Setup

```bash
cd aurum-admin
npm install
npm run dev
```

Admin panel runs on → http://localhost:5174

---

## 🔐 Admin Credentials

```
Email: admin@aurum.com
Password: admin123
```

---

## 🌐 Environment Variables

### Backend (`aurum-backend/.env`)

```env
MONGODB_URI=mongodb://localhost:27017/aurum_perfume
PORT=5000
NODE_ENV=development
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

### Frontend (`aurum-frontend/.env`)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## ✨ Features

### 🛍️ User Features

* Product listing & filtering
* Product detail page
* Shopping cart
* User authentication (JWT + Google)
* Contact form

### 🛠️ Admin Features

* Admin dashboard
* Product CRUD operations
* Contact message management
* Protected routes

---

## 📦 API Endpoints

### Products

```
GET    /api/products
GET    /api/products/:id
POST   /api/products        (Admin)
PUT    /api/products/:id    (Admin)
DELETE /api/products/:id    (Admin)
```

### Users

```
POST /api/users/register
POST /api/users/login
POST /api/users/google
GET  /api/users/profile
```

### Orders

```
POST /api/orders
GET  /api/orders/my-orders
```

### Contact

```
POST /api/contact
GET  /api/contact (Admin)
```

---

## 🧠 Key Logic

Homepage displays exactly **8 products**:

```js
products.slice(0, 4)  // Featured
products.slice(4, 8)  // New Arrivals
```

---

## 🐛 Troubleshooting

### MongoDB not connecting

* Start MongoDB OR use Atlas

### Products not showing

```bash
npm run seed-products
```

### Admin login failed

```bash
npm run seed
```

### Network errors

* Ensure backend is running on port 5000
* Check API URL in `.env`

---

## 🧱 Tech Stack

### Frontend

* React 18
* Vite
* Tailwind CSS
* React Router
* Framer Motion

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose

### Authentication

* JWT
* bcrypt

---

## 📌 Future Improvements

* Payment integration (Stripe/Razorpay)
* Mobile responsiveness
* Product reviews & ratings
* Order tracking system

---

## ⭐ Support

If you like this project:

* ⭐ Star the repo
* 🍴 Fork it
* 📢 Share it
