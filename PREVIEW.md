# 👀 Preview Palvins Locally - Quick Start

## Option 1: Run Locally (Recommended for First Preview)

### Prerequisites
- Have Node.js installed (download from nodejs.org)
- Have Git installed
- Text editor (VS Code recommended)

### Step 1: Clone & Setup (5 minutes)

```bash
# Clone the repository
git clone https://github.com/kauranivedha898-code/palvins.git
cd palvins

# Install dependencies
npm install
```

### Step 2: Create Environment File
Create a file called `.env.local` in the root folder:

```env
NEXT_PUBLIC_SUPABASE_URL=https://placeholder.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=placeholder_key
SUPABASE_SERVICE_ROLE_KEY=placeholder_key

NEXT_PUBLIC_PAYSTACK_KEY=pk_test_placeholder
PAYSTACK_SECRET_KEY=sk_test_placeholder

NEXT_PUBLIC_FLUTTERWAVE_KEY=FLWPUBK_placeholder
FLUTTERWAVE_SECRET_KEY=FLWSECK_placeholder

NEXT_PUBLIC_API_URL=http://localhost:3000
DEFAULT_NGN_TO_INR_RATE=2.8
NODE_ENV=development
```

**Note:** These are placeholder values for now. The app will work without real credentials for preview purposes.

### Step 3: Run the App

```bash
npm run dev
```

### Step 4: Open in Browser
- Open your browser
- Go to: **http://localhost:3000**
- You'll see the Palvins home page! 🎉

---

## What You Can Preview Without Supabase

### ✅ Customer Website Works:
- **Home page** - Hero, featured products section
- **Shop page** - Product grid, search, filtering
- **Product cards** - Images, names, prices, add to cart
- **Shopping cart** - Add/remove items, quantity changes
- **Checkout page** - Form fields, payment options
- **About page** - Brand story, mission, values
- **Contact page** - Contact form

### ⚠️ Admin Dashboard Requires Supabase:
- You'll see the login page
- Can't actually log in without database
- (Will show placeholder data after setup)

---

## Option 2: Setup with Real Supabase (10 minutes for Full Preview)

### Step 1: Create Supabase Project
1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up with email
4. Create new project:
   - Name: `palvins-preview`
   - Password: Choose one
   - Region: Singapore
5. Wait 2 minutes for project to create

### Step 2: Get Your Credentials
1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - `Project URL` (looks like: https://xxxxx.supabase.co)
   - `anon public key` (long string starting with eyJ...)
   - `service_role key` (click eye icon first)

### Step 3: Import Database Schema
1. In Supabase, go to **SQL Editor**
2. Click "+ New query"
3. Open `database/schema.sql` from your project folder
4. Copy entire content
5. Paste into SQL Editor
6. Click "Run"
7. Wait for success ✅

### Step 4: Update .env.local
Replace placeholder with real values:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc... (your anon key)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc... (your service role key)
```

### Step 5: Create Test User
1. In Supabase, go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Email: `admin@palvins.com`
4. Password: `Test123!`
5. Click "Create user"

### Step 6: Restart App
```bash
# Stop current app (Ctrl+C)
# Restart:
npm run dev
```

### Step 7: Test Everything

**Preview Customer Site:**
- Go to http://localhost:3000
- Browse products
- Add to cart
- Go to checkout

**Preview Admin Dashboard:**
- Go to http://localhost:3000/control/login
- Login with: `admin@palvins.com` / `Test123!`
- See dashboard with all features!

---

## 🎬 Preview Walkthrough

### Home Page (http://localhost:3000)
```
🌿 Palvins Logo
        ↓
"Premium Health Cakes & Conscious Eating"
        ↓
Featured products section
        ↓
Call-to-action buttons
        ↓
Footer with links
```

### Shop Page (http://localhost:3000/shop)
```
Search bar at top
        ↓
Category filters (Health Cakes, Snacks, etc)
        ↓
Product grid (3 columns on desktop)
        ↓
Each product card has:
  - Image
  - Name
  - Price
  - Tags
  - "Add to Cart" button
```

### Cart Page (http://localhost:3000/cart)
```
Your cart with items:
  - Product name
  - Quantity (can adjust)
  - Price
  - Remove button
        ↓
Order summary:
  - Subtotal
  - Shipping (₦2,500)
  - Total
        ↓
Checkout button
```

### Checkout (http://localhost:3000/checkout)
```
Left side: Checkout form
  - Full name
  - Email
  - Phone
  - Address
  - City, State
  
Right side: Order summary
  - Items list
  - Subtotal
  - Shipping
  - Total
        ↓
Payment method selection:
  ☐ Paystack
  ☐ Flutterwave
        ↓
"Pay ₦XXX,XXX" button
```

### Admin Dashboard (http://localhost:3000/control/dashboard)
```
After login, you see:
        ↓
4 KPI cards:
  - Total Sales
  - Orders Pending
  - Orders Delivered
  - Total Products
        ↓
6 Management sections:
  🥘 Ingredients - Manage costs
  📖 Recipes - Create with calculations
  🎁 Products - Publish for sale
  📦 Inventory - Track stock
  📋 Orders - Manage orders
  ⚙️ Settings - Configure system
```

### Ingredients Page (http://localhost:3000/control/ingredients)
```
"+ Add Ingredient" button
        ↓
Form to add new ingredient:
  - Name
  - Category
  - Unit
  - Pack size
  - Cost NGN
  - Cost per unit
        ↓
Table showing all ingredients
(Edit/Delete buttons for each)
```

### Recipes Page (http://localhost:3000/control/recipes)
```
"+ New Recipe" button
        ↓
Form with:
  - Recipe name
  - Description
  - Cost breakdown:
    * Packaging cost
    * Labour cost
    * Electricity cost
    * Gas cost
    * Delivery cost
  - AUTO CALCULATED:
    * Total Cost
    * Profit Margin %
    * Suggested selling price
        ↓
Grid of recipe cards showing
all created recipes
```

### Products Page (http://localhost:3000/control/products)
```
"+ New Product" button
        ↓
Form to create product:
  - Name
  - Description
  - Category
  - Selling price
  - Image URL
  - Tags (comma-separated)
        ↓
Product cards grid showing:
  - Image
  - Name
  - Price
  - Tags
  - Status (Published/Draft)
  - Edit/Unpublish/Delete buttons
```

### Orders Page (http://localhost:3000/control/orders)
```
Filter buttons:
  All | Pending | Processing | Shipped | Delivered | Cancelled
        ↓
Orders table showing:
  - Order #
  - Customer
  - Amount
  - Status (colored badge)
  - Payment status
  - Dropdown to change status
```

### Inventory Page (http://localhost:3000/control/inventory)
```
Alert section:
  "⚠️ X items need reordering"
        ↓
Inventory table showing:
  - Ingredient name
  - Opening stock
  - Purchases
  - Usage
  - Closing stock
  - Reorder level
  - Status (OK / Low Stock)
  - Update button
        ↓
Update form when you click a row
```

### Settings Page (http://localhost:3000/control/settings)
```
Account Settings:
  - Email (read-only)
  - Role (read-only)
  - Change Password button
        ↓
Business Information:
  - Business name
  - Email
  - Phone
  - Address
        ↓
Currency Settings:
  - Primary: NGN ✓
  - Alternate: INR
  - Exchange rate (editable)
        ↓
System Information:
  - App version
  - Framework
  - Database type
```

---

## 🎨 Design Preview

### Colors You'll See:
- **Sage Green** (#5E6B4A) - Primary buttons & accents
- **Warm Beige** (#E9DFC9) - Secondary accents
- **Cream** (#F7F2E8) - Background
- **Dark Cocoa** (#3A2E28) - Text
- **Terracotta** (#C57B57) - Warnings & highlights

### Typography:
- **Headers:** Playfair Display (elegant serif)
- **Body:** Inter (clean sans-serif)

### Responsive Layout:
- **Mobile:** Stacked, full width
- **Tablet:** 2 columns
- **Desktop:** 3-4 columns, optimal spacing

---

## 🧪 Test Scenarios

### Test Customer Shopping:
1. Click "Shop" in header
2. Add 2-3 products to cart
3. Click cart icon (top right)
4. Increase/decrease quantities
5. Click "Proceed to Checkout"
6. Fill in test address
7. See order summary

### Test Admin Features:
1. Add 3 ingredients with costs
2. Create a recipe using those ingredients
3. See cost auto-calculations
4. Create a product from the recipe
5. Publish the product
6. Add to cart as customer (it appears!)
7. Track order in admin

---

## ⚡ Quick Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Open in browser
open http://localhost:3000
```

---

## 🐛 Troubleshooting Preview

**Issue:** "Error: Cannot find module"
- Run: `npm install`

**Issue:** "Port 3000 already in use"
- Run on different port: `npm run dev -- -p 3001`
- Visit: http://localhost:3001

**Issue:** "Supabase connection failed" (when trying admin panel)
- This is expected without real Supabase keys
- Still preview all UI elements!
- See "Option 1" above to preview UI only

**Issue:** Products don't show in shop
- Need real Supabase with data inserted
- See "Option 2" to setup with database

---

## 📸 Screenshots You'll See

After running locally, you'll see:

✅ Beautiful home page with hero section
✅ Product grid in shop
✅ Working shopping cart
✅ Checkout form
✅ Professional admin dashboard
✅ Fully functional forms
✅ Responsive mobile design
✅ Premium branding throughout

---

## ✨ Next Steps After Preview

1. **Like what you see?** → Setup with Supabase (Option 2)
2. **Want to customize?** → Edit colors/text in `src/`
3. **Ready to deploy?** → Follow `DEPLOYMENT.md`
4. **Need help?** → Contact: pallavikaurani9@gmail.com

---

**Happy previewing! 🎉**

Questions? WhatsApp: +234 803 555 7284
