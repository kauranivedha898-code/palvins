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

-- Create suppliers table
CREATE TABLE suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  contact_person TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
