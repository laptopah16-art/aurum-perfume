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

Screenshots

HOME PAGE
<img width="1366" height="768" alt="Screenshot (30)" src="https://github.com/user-attachments/assets/1da5cd93-da8d-4ba7-b6d9-9dc6af4b0e83" />
<img width="1366" height="768" alt="Screenshot (31)" src="https://github.com/user-attachments/assets/cfc6c25b-fc35-42b5-a37e-5d4e716e68d4" />

COLLECTION
<img width="1366" height="768" alt="Screenshot (32)" src="https://github.com/user-attachments/assets/b8747d0a-96d6-4c6c-97d9-2cb4aa5b39f2" />
<img width="1366" height="768" alt="Screenshot (33)" src="https://github.com/user-attachments/assets/458a540b-36a6-490c-be17-28ffd790b817" />

CART PAGE
<img width="1366" height="768" alt="Screenshot (34)" src="https://github.com/user-attachments/assets/bab49d11-4054-4b8b-948e-fd1834d21d26" />

ORDER PAGE
<img width="1366" height="768" alt="Screenshot (35)" src="https://github.com/user-attachments/assets/145b1d66-5e66-46d4-86ad-6fccd6b704d8" />

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
