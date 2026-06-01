# 🌿 Palvins - Health Cakes & Conscious Eating

A production-ready e-commerce platform for **Palvins**, a premium health cakes and conscious eating company launching in Nigeria.

## 📖 Project Overview

Palvins is an integrated system combining:

- **👥 Customer Website** - E-commerce storefront at www.palvins.com
- **📦 Order Management** - Track orders from creation to delivery
- **👨‍🍳 Recipe Builder** - Create recipes with auto-cost calculations
- **💰 Ingredient Costing** - Manage costs in NGN/INR with auto-conversion
- **📊 Inventory Management** - Track stock levels and reorder alerts
- **🎨 Product Publishing** - Recipes → Products → Website
- **🔐 Private Control Room** - Secure management portal at control.palvins.com

## 🎨 Brand Identity

| Element | Color | Hex |
|---------|-------|-----|
| **Primary** | Deep Sage Green | #5E6B4A |
| **Secondary** | Warm Beige | #E9DFC9 |
| **Accent** | Terracotta | #C57B57 |
| **Background** | Cream | #F7F2E8 |
| **Text** | Dark Cocoa | #3A2E28 |

**Theme:** Premium • Natural • Healthy • Modern • Warm • Elegant

## 🌐 Public Website Pages

✅ **Implemented:**
- **Home** - Hero section with featured products
- **Shop** - Product catalog with category filtering
- **Cart** - Shopping cart with quantity management
- **Checkout** - Multi-step checkout with payment options
- **About** - Brand story, mission, vision, values
- **Contact** - Contact form, email, phone, WhatsApp

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14, React 18, TypeScript |
| **Styling** | Tailwind CSS |
| **State** | Zustand (client-side) |
| **Backend** | Supabase (PostgreSQL) |
| **Auth** | Supabase Auth |
| **Storage** | Supabase Storage |
| **Payments** | Paystack, Flutterwave (ready for integration) |
| **Deployment** | Vercel |

## 📊 Database Schema

```
├── users (auth)
├── roles (RBAC)
├── ingredients (master data)
├── recipes (templates)
├── recipe_items (mappings)
├── products (published items)
├── inventory (stock tracking)
├── orders (customer orders)
├── order_items (line items)
├── customers (profiles)
├── suppliers (vendor data)
├── exchange_rates (currency)
├── nutrition_data (nutritional info)
└── settings (configuration)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Supabase account (free tier available)
- Vercel account (for deployment)

### Installation

```bash
# Clone repository
git clone https://github.com/kauranivedha898-code/palvins.git
cd palvins

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

### Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Payment Providers
NEXT_PUBLIC_PAYSTACK_KEY=your_paystack_key
PAYSTACK_SECRET_KEY=your_paystack_secret

NEXT_PUBLIC_FLUTTERWAVE_KEY=your_flutterwave_key
FLUTTERWAVE_SECRET_KEY=your_flutterwave_secret

# App Config
NEXT_PUBLIC_API_URL=http://localhost:3000
DEFAULT_NGN_TO_INR_RATE=2.8
NODE_ENV=development
```

## 📁 Project Structure

```
src/
├── app/                    # Next.js pages
│   ├── page.tsx           # Home page
│   ├── shop/              # Shop page
│   ├── cart/              # Cart page
│   ├── checkout/          # Checkout page
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   └── Button.tsx
├── lib/                   # Utilities
│   ├── supabase.ts       # Client
│   ├── supabase-server.ts# Server
│   └── utils.ts          # Helpers
├── store/                # Zustand state
│   ├── cart.ts           # Cart state
│   └── auth.ts           # Auth state
├── types/                # TypeScript types
│   ├── index.ts
│   └── database.types.ts
└── styles/               # Global styles
    └── globals.css
```

## 📱 Features Implemented

### Customer Website
- ✅ Responsive mobile-first design
- ✅ Product catalog with search & filtering
- ✅ Shopping cart (persistent via localStorage)
- ✅ Checkout form with address fields
- ✅ Payment method selection (Paystack/Flutterwave)
- ✅ About & Contact pages
- ✅ SEO optimized

### Backend Ready
- ✅ Database schema with all tables
- ✅ TypeScript types for all entities
- ✅ Supabase client setup
- ✅ Authentication structure
- ✅ Environment configuration

## 🔐 Private Control Room (Coming Next)

**Access:** control.palvins.com

### Role-Based Access (RBAC):
- **Owner** - Full system access
- **Production Staff** - Recipes, inventory (no profit margins)
- **Sales Staff** - Orders only (no costs)
- **Accountant** - Sales & costs (no editing)

### Features to Build:
- Dashboard with KPIs
- Ingredient Master database
- Recipe Builder with calculations
- Product Management
- Inventory Tracking
- Order Management
- Settings & Configuration

## 📞 Contact

- **Email:** pallavikaurani9@gmail.com
- **Phone:** +234 803 555 7284
- **WhatsApp:** [Chat](https://wa.me/2348035557284)

## 📄 License

MIT © 2025 Palvins

---

**Next Steps:**
1. Setup Supabase project with provided schema
2. Configure environment variables
3. Build control room with role-based auth
4. Integrate Paystack & Flutterwave payments
5. Deploy to Vercel
