# AURUM Backend - Luxury Perfume E-commerce API

A complete Node.js/Express backend for the AURUM luxury perfume e-commerce website.

## Features

- **User Authentication**: JWT-based authentication with bcrypt password hashing
- **Product Management**: Full CRUD operations with image uploads via Multer
- **Order Management**: Create orders, track status, manage inventory
- **Admin Dashboard**: Statistics, order management, user management
- **Payment Ready**: Prepared for Stripe and Razorpay integration

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Multer for file uploads
- dotenv for environment variables
- CORS for frontend connection

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB (local or cloud)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
# Edit .env file with your settings
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/products/best-sellers` - Get best sellers
- `GET /api/products/new-arrivals` - Get new arrivals
- `GET /api/products/categories` - Get categories
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Users
- `POST /api/users/register` - Register user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get profile (Protected)
- `PUT /api/users/profile` - Update profile (Protected)
- `PUT /api/users/change-password` - Change password (Protected)

### Orders
- `POST /api/orders` - Create order (Protected)
- `GET /api/orders/my-orders` - Get my orders (Protected)
- `GET /api/orders/:id` - Get order by ID (Protected)
- `PUT /api/orders/:id/status` - Update order status (Admin)
- `GET /api/orders/stats` - Get order statistics (Admin)

## Environment Variables

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/aurum_perfume
JWT_SECRET=your_secret_key
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:5173

# Payment (Optional)
STRIPE_SECRET_KEY=your_stripe_key
RAZORPAY_KEY_ID=your_razorpay_key
```

## Project Structure

```
aurum-backend/
├── config/
│   └── db.js           # MongoDB connection
├── controllers/
│   ├── userController.js
│   ├── productController.js
│   └── orderController.js
├── middleware/
│   ├── authMiddleware.js
│   └── adminMiddleware.js
├── models/
│   ├── User.js
│   ├── Product.js
│   └── Order.js
├── routes/
│   ├── userRoutes.js
│   ├── productRoutes.js
│   └── orderRoutes.js
├── uploads/            # Image uploads
├── server.js            # Entry point
├── package.json
└── .env               # Environment variables
```

## Creating Admin User

To create an admin user, you can use this endpoint or modify a user's role directly in MongoDB:

```javascript
// In MongoDB shell or MongoDB Compass
db.users.updateOne(
  { email: "admin@example.com" },
  { $set: { role: "admin" } }
)
```

## License

ISC

