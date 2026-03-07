# AURUM Backend - Implementation TODO

## Phase 1: Project Setup ✅
- [x] Create package.json with all dependencies
- [x] Create .env file with configuration
- [x] Create server.js (main entry point)
- [x] Create config/db.js (MongoDB connection)

## Phase 2: Database Models ✅
- [x] Create models/User.js (name, email, password, role)
- [x] Create models/Product.js (all product fields)
- [x] Create models/Order.js (user, orderItems, shipping, payment, status)

## Phase 3: Middleware ✅
- [x] Create middleware/authMiddleware.js (JWT verification)
- [x] Create middleware/adminMiddleware.js (Admin role check)

## Phase 4: Controllers ✅
- [x] Create controllers/userController.js (register, login, getProfile)
- [x] Create controllers/productController.js (CRUD operations)
- [x] Create controllers/orderController.js (create, get, update)

## Phase 5: Routes ✅
- [x] Create routes/userRoutes.js
- [x] Create routes/productRoutes.js
- [x] Create routes/orderRoutes.js

## Phase 6: Testing ✅
- [x] Install dependencies
- [x] Project structure verified

## Dependencies Installed:
- express
- mongoose
- dotenv
- cors
- jsonwebtoken
- bcryptjs
- multer
- nodemon (dev)

