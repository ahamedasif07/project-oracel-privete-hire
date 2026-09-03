# 🚖 Oracle Private Hire — Full-Stack Chauffeur & Dispatch Platform

A luxury Chauffeur & Executive Airport Transfer web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **MongoDB Atlas (Mongoose)**, and **Stripe Payment Gateway**.

---

## 📋 Required Environment Variables (`.env`)

To run this project locally or deploy it to production (Vercel, VPS, etc.), create a `.env` file in the root directory and configure the following variables:

| Variable Name | Required | Default / Example | Purpose / Description |
| :--- | :---: | :--- | :--- |
| `MONGODB_URI` | **Yes** | `mongodb+srv://user:pass@cluster0.tzvnomp.mongodb.net/oracle_private_hire?retryWrites=true&w=majority` | MongoDB Atlas database connection string. |
| `JWT_SECRET` | **Yes** | `oracle-private-hire-super-secret-key-2025` | Secret key used to encrypt and sign Admin JWT session cookies. |
| `ADMIN_USERNAME` | **Yes** | `admin` | Super Admin initial login username. |
| `ADMIN_EMAIL` | **Yes** | `rxasif31@gmail.com` | Super Admin email address. |
| `ADMIN_PASSWORD` | **Yes** | `123456` | Super Admin login password. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | **Yes** | `pk_test_...` | Stripe Publishable API Key (used on the client-side for card payments). |
| `STRIPE_SECRET_KEY` | **Yes** | `sk_test_...` | Stripe Secret Key (used on the server for checkout sessions). |
| `STRIPE_WEBHOOK_SECRET` | No | `whsec_...` | Stripe Webhook Secret for verifying async events. |
| `SMTP_HOST` | No | `smtp.gmail.com` | Mail server host for dispatch receipts. |
| `SMTP_PORT` | No | `587` | Mail server port (`587` for TLS / `465` for SSL). |
| `SMTP_SECURE` | No | `false` | Set to `true` for port 465, `false` for port 587. |
| `SMTP_USER` | No | `bookings@oracleprivatehire.co.uk` | SMTP login email address. |
| `SMTP_PASS` | No | `your_app_password` | SMTP email password or Google App Password. |
| `SMTP_FROM` | No | `"Oracle Private Hire" <bookings@oracleprivatehire.co.uk>` | Default sender display name and email address. |
| `NOTIFICATION_EMAIL` | No | `rxasif31@gmail.com` | Email address where new booking alerts are forwarded. |
| `NEXT_PUBLIC_APP_URL` | **Yes** | `http://localhost:3000` (or `https://yourdomain.co.uk`) | Base URL used for Stripe redirects and email links. |

---

## 🔑 Detailed Setup Guide

### 1. MongoDB Atlas Setup (`MONGODB_URI`)
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/).
2. In your Cluster, click **Connect** > **Drivers** (Node.js).
3. Copy the connection string and paste your database user password:
   ```env
   MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.tzvnomp.mongodb.net/oracle_private_hire?retryWrites=true&w=majority&appName=Cluster0"
   ```

### 2. Stripe Payment Gateway (`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` & `STRIPE_SECRET_KEY`)
1. Go to your [Stripe Dashboard](https://dashboard.stripe.com/apikeys).
2. Copy your **Publishable key** (`pk_test_...` or `pk_live_...`) and **Secret key** (`sk_test_...` or `sk_live_...`).
3. Set them in `.env`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
   STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
   ```

### 3. Admin Authentication
Admins can log in at `/admin/login` using either their username or email:
- **Username:** `admin` (or `ADMIN_USERNAME`)
- **Email:** `rxasif31@gmail.com` (or `ADMIN_EMAIL`)
- **Password:** `123456` (or `ADMIN_PASSWORD`)

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies
```bash
npm install
```

### 2. Configure `.env`
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser.

### 4. Build for Production
```bash
npm run build
npm start
```

---

## 📂 Key Architecture

- **`services/`**: Core business logic layer with resilient local JSON fallback storage.
- **`controllers/`**: HTTP request validation & response formatting.
- **`app/api/`**: Thin Next.js Route Handlers.
- **`app/admin/`**: Executive Dispatch Dashboard, Bookings, Fleet Management, and Staff Admin Accounts.
- **`components/booking/`**: 4-Step Booking Wizard with live fare quoting & Stripe Checkout integration.
