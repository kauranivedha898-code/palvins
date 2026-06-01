# 🚀 Palvins Setup Guide

## Quick Start in 5 Minutes

### 1. **Create Supabase Project**
- Go to [supabase.com](https://supabase.com)
- Click "New Project"
- Name: `palvins`
- Select Region: `Singapore` (closest to Nigeria)
- Copy your project URL and anon key

### 2. **Setup Database**
In Supabase SQL Editor, run these commands:

```sql
-- Create roles table
CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  permissions JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role_id UUID REFERENCES roles(id),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Insert default roles
INSERT INTO roles (name, description) VALUES
  ('owner', 'Full system access'),
  ('production_staff', 'Recipe & inventory management'),
  ('sales_staff', 'Order processing'),
  ('accountant', 'Sales & cost reporting');

-- Create ingredients table
CREATE TABLE ingredients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  unit TEXT NOT NULL,
  pack_size DECIMAL NOT NULL,
  cost_ngn DECIMAL NOT NULL,
  cost_inr DECIMAL,
  cost_per_unit DECIMAL NOT NULL,
  notes TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create recipes table
CREATE TABLE recipes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  packaging_cost DECIMAL DEFAULT 0,
  labour_cost DECIMAL DEFAULT 0,
  electricity_cost DECIMAL DEFAULT 0,
  gas_cost DECIMAL DEFAULT 0,
  delivery_cost DECIMAL DEFAULT 0,
  total_cost DECIMAL DEFAULT 0,
  cost_per_serving DECIMAL DEFAULT 0,
  suggested_selling_price DECIMAL DEFAULT 0,
  profit_margin DECIMAL DEFAULT 0,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create recipe_items table
CREATE TABLE recipe_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recipe_id UUID NOT NULL REFERENCES recipes(id),
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  quantity DECIMAL NOT NULL,
  unit TEXT NOT NULL,
  cost DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  selling_price DECIMAL NOT NULL,
  recipe_id UUID REFERENCES recipes(id),
  is_published BOOLEAN DEFAULT false,
  publish_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create inventory table
CREATE TABLE inventory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ingredient_id UUID NOT NULL REFERENCES ingredients(id),
  opening_stock DECIMAL DEFAULT 0,
  purchases DECIMAL DEFAULT 0,
  usage DECIMAL DEFAULT 0,
  closing_stock DECIMAL DEFAULT 0,
  reorder_level DECIMAL DEFAULT 0,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Create customers table
CREATE TABLE customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  address TEXT,
  city TEXT,
  state TEXT,
  postal_code TEXT,
  order_count INT DEFAULT 0,
  total_spent DECIMAL DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,
  customer_id UUID NOT NULL REFERENCES customers(id),
  total_amount DECIMAL NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  payment_method TEXT,
  payment_reference TEXT,
  delivery_status TEXT DEFAULT 'pending',
  delivery_address TEXT NOT NULL,
  delivery_date TIMESTAMP,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id),
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price DECIMAL NOT NULL,
  total DECIMAL NOT NULL
);

-- Create nutrition_data table
CREATE TABLE nutrition_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id),
  calories DECIMAL NOT NULL,
  protein DECIMAL NOT NULL,
  carbohydrates DECIMAL NOT NULL,
  fat DECIMAL NOT NULL,
  sugar DECIMAL NOT NULL,
  fiber DECIMAL,
  sodium DECIMAL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create exchange_rates table
CREATE TABLE exchange_rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  from_currency TEXT NOT NULL,
  to_currency TEXT NOT NULL,
  rate DECIMAL NOT NULL,
  last_updated TIMESTAMP DEFAULT NOW()
);

-- Insert default exchange rate
INSERT INTO exchange_rates (from_currency, to_currency, rate) 
VALUES ('NGN', 'INR', 2.8);

-- Create settings table
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### 3. **Clone & Setup Project**

```bash
git clone https://github.com/kauranivedha898-code/palvins.git
cd palvins
npm install
```

### 4. **Configure Environment**

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

NEXT_PUBLIC_PAYSTACK_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx

NEXT_PUBLIC_FLUTTERWAVE_KEY=FLWPUBK_xxxxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_xxxxx

NEXT_PUBLIC_API_URL=http://localhost:3000
DEFAULT_NGN_TO_INR_RATE=2.8
NODE_ENV=development
```

### 5. **Run Development Server**

```bash
npm run dev
```

Visit: http://localhost:3000

## 📝 Testing the Application

### Add Sample Product

1. Go to Supabase dashboard
2. Create a product in the `products` table:

```sql
INSERT INTO products (name, description, category, selling_price, tags, is_published)
VALUES 
  ('Chocolate Health Cake', 'Premium dark chocolate cake with no refined sugar', 'health_cakes', 15000, ARRAY['chocolate', 'low-sugar', 'vegan'], true),
  ('Energy Balls', 'Natural energy snacks made with nuts and dates', 'healthy_snacks', 5000, ARRAY['energy', 'protein', 'natural'], true);
```

3. Visit http://localhost:3000 to see products

## 🔐 Setup Authentication (Next Step)

```bash
# Generate types from Supabase
npm run db:generate
```

## 🚢 Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Select your project and follow prompts.

## 📞 Support

- **Docs:** https://supabase.com/docs
- **Next.js:** https://nextjs.org/docs
- **Tailwind:** https://tailwindcss.com/docs
- **Contact:** pallavikaurani9@gmail.com

---

**You're all set! 🎉**

Navigate to `/shop` to see the product listing, add items to cart, and proceed to checkout.
