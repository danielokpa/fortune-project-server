# E-Commerce Store Backend

A scalable and production-ready e-commerce backend built with **NestJS**, **Prisma ORM**, **PostgreSQL**, and **Stripe**. The platform provides complete functionality for managing users, authentication, products, categories, orders, payments, and administrative operations.

---

# Features

## Authentication & Authorization

- User registration and login
- JWT-based authentication
- Refresh token support
- Email verification
- Password reset flow
- Role-based access control (RBAC)
- Admin and customer permissions

## User Management

- Customer account management
- User profile updates
- Address management
- Account verification
- Active/inactive account status

## Marketplace

### Products

- Create, update, and delete products
- Product inventory management
- Product images
- Product pricing
- Product availability status
- Product search and filtering

### Categories

- Create and manage product categories
- Category-based product organization
- Product-category relationships

## Orders

- Create orders
- Order status tracking
- Order history
- Order item management
- Customer order management
- Admin order processing

## Payments

- Stripe payment integration
- Secure checkout process
- Payment verification
- Payment tracking
- Transaction management
- Order-payment synchronization

## Admin Module

- User administration
- Product administration
- Category administration
- Order administration
- Platform analytics foundation
- Administrative access controls

---

# Technology Stack

## Backend

- NestJS
- TypeScript
- Node.js

## Database

- PostgreSQL

## ORM

- Prisma ORM

## Authentication

- JWT
- Passport

## Payments

- Stripe

## Validation

- class-validator
- class-transformer

---

# Project Structure

```text
src/
├── admin/
├── auth/
├── users/
├── marketplace/
│   ├── products/
│   └── categories/
├── orders/
├── payments/
├── prisma/
├── common/
├── config/
└── main.ts
```

---

# Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce"

JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

MAIL_HOST=your_mail_host
MAIL_PORT=587
MAIL_USER=your_mail_user
MAIL_PASSWORD=your_mail_password

FRONTEND_URL=http://localhost:3000
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
cd <project-folder>
```

## Install Dependencies

```bash
npm install
```

---

# Database Setup

## Generate Prisma Client

```bash
npm run prisma:generate
```

## Run Migrations

```bash
npm run prisma:deploy
```

For local development:

```bash
npm run prisma:migrate -- --name init
```

## Seed Database

```bash
npm run prisma:seed
```

---

# Running the Application

## Development

```bash
npm run start:dev
```

## Production

```bash
npm run build
npm run start:prod
```

---

# API Modules

## Auth Module

Handles:

- Registration
- Login
<!-- - Token refresh -->
- Password reset
- Email verification

## Users Module

Handles:

- User profiles
- User addresses
- Account management

## Marketplace Module

Handles:

### Products

- Product creation
- Product updates
- Product retrieval
- Product inventory

### Categories

- Category creation
- Category management
- Product categorization

## Orders Module

Handles:

- Order creation
- Order processing
- Order status updates
- Order history

## Payments Module

Handles:

- Stripe checkout
- Payment confirmation
- Transaction records
- Payment verification

## Admin Module

Handles:

- Platform administration
- User management
- Product management
- Category management
- Order management

---

# Prisma Commands

Generate client:

```bash
npx prisma generate
```

Create migration:

```bash
npx prisma migrate dev --name migration_name
```

Apply migrations:

```bash
npx prisma migrate deploy
```

Open Prisma Studio:

```bash
npx prisma studio
```

Reset database:

```bash
npx prisma migrate reset
```

---

# Security

- JWT authentication
- Password hashing
- Role-based authorization
- Request validation
- Secure payment processing through Stripe
- Environment-based configuration

---

# Future Enhancements

- Product reviews and ratings
- Wishlist functionality
- Shopping cart persistence
- Coupons and discounts
- Inventory alerts
- Analytics dashboard
- Multi-vendor marketplace support
- Multi-currency support

---

# License

This project is licensed under the MIT License.
