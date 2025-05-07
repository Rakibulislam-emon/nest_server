# Nest Server

Backend API for the Nest Grocery Shop e-commerce platform.

## Features

- 🔄 RESTful API endpoints for e-commerce operations
- 🛒 Product management with filtering, sorting, and pagination
- 💳 Secure payment processing with Stripe
- 👤 User authentication and management
- 🔍 Advanced product search and filtering
- 📊 Featured categories and popular products
- 💰 Special deals and promotions

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB
- **Payment Processing**: Stripe
- **Authentication**: JWT
- **Date Handling**: Moment.js
- **HTTP Client**: Axios
- **Security**: bcrypt for password hashing
- **Environment Variables**: dotenv

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB instance (local or Atlas)
- npm or yarn
- Stripe account for payment processing

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/nest-grocery-shop.git
cd nest-grocery-shop/nest_server
```

2. Install dependencies
```bash
npm install
# or
yarn
```

3. Create a `.env` file in the root directory with the following variables:
```
PORT=5000
URI=your_mongodb_connection_string
STRIPE_KEY=your_stripe_secret_key
JWT_SECRET=your_jwt_secret
```

4. Start the development server
```bash
npm run dev
```

5. The server will be running at `http://localhost:5000`

## API Endpoints

### Products

- `GET /api/products` - Get all products with filtering, sorting, and pagination
- `GET /api/product-details/:id` - Get product details by ID
- `GET /api/products/featured-categories` - Get featured product categories
- `GET /api/popular-products` - Get popular products (rating > 4.7)
- `GET /api/deals` - Get current deals and promotions

### Authentication

- `POST /api/register` - Register a new user

### Payment

- `POST /api/payment/process` - Process payment with Stripe

## Project Structure

```
nest_server/
├── config/
│   └── db.js
├── helper/
│   └── connectCollection.js
├── routes/
│   ├── Authentication/
│   │   └── registration.js
│   ├── payment/
│   │   └── payment.js
│   ├── dealsRoute.js
│   ├── featuredCategoryRoutes.js
│   ├── popularProductRoutes.js
│   ├── productDetails.js
│   └── productRoutes.js
├── .env
├── .gitignore
├── index.js
├── package.json
└── vercel.json
```

## Database Structure

The application uses MongoDB with the following main collections:
- `all_products` - Stores all product information
- `user` - Stores user account information

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` file includes the necessary configuration for serverless deployment.

## CORS Configuration

The server is configured to accept requests from:
- `https://nest-client-henna.vercel.app`
- `http://localhost:5173` (for local development)

## License

[MIT](LICENSE)

## Related Projects

- [Nest Client](https://github.com/yourusername/nest-grocery-shop/tree/main/nest_client) - Frontend for the Nest Grocery Shop
