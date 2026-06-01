# 🚀 Complete Palvins Deployment Guide

## Phase 1: Local Development Setup (30 minutes)

### Step 1: Clone the Repository
```bash
git clone https://github.com/kauranivedha898-code/palvins.git
cd palvins
npm install
```

### Step 2: Setup Supabase
1. Go to [supabase.com](https://supabase.com)
2. Sign up with your email
3. Create new project
   - Project name: `palvins`
   - Password: Save securely
   - Region: `Singapore` (closest to Nigeria)
4. Click "Create new project" and wait 2 minutes

### Step 3: Copy Supabase Credentials
1. Go to **Settings** → **API**
2. Copy:
   - `Project URL` 
   - `anon public` (copy the key)
3. Go to **Settings** → **API** → click eye icon for `service_role` key

### Step 4: Setup Database
1. Go to **SQL Editor** in Supabase
2. Create new query
3. Copy entire content from `database/schema.sql`
4. Paste into SQL Editor
5. Click "Run"
6. Wait for success message ✅

### Step 5: Configure Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...copy-from-supabase
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...copy-from-supabase

NEXT_PUBLIC_PAYSTACK_KEY=pk_test_xxxxx
PAYSTACK_SECRET_KEY=sk_test_xxxxx

NEXT_PUBLIC_FLUTTERWAVE_KEY=FLWPUBK_xxxxx
FLUTTERWAVE_SECRET_KEY=FLWSECK_xxxxx

NEXT_PUBLIC_API_URL=http://localhost:3000
DEFAULT_NGN_TO_INR_RATE=2.8
NODE_ENV=development
```

### Step 6: Setup Authentication
1. In Supabase, go to **Authentication** → **Providers**
2. Email/Password is already enabled ✅
3. Go to **Users** and create test user:
   - Email: `admin@palvins.com`
   - Password: `123456` (for testing only)

### Step 7: Run Locally
```bash
npm run dev
```

Visit:
- **Public Site:** http://localhost:3000
- **Login:** http://localhost:3000/control/login
- **Dashboard:** http://localhost:3000/control/dashboard

---

## Phase 2: Testing Locally

### Test Customer Journey
1. Go to http://localhost:3000
2. Browse products
3. Add items to cart
4. Go to checkout
5. Enter test details
6. Submit

### Test Control Room
1. Go to http://localhost:3000/control/login
2. Login: `admin@palvins.com` / `123456`
3. Navigate dashboard
4. Add ingredients
5. Create recipes
6. Create products
7. Manage orders

---

## Phase 3: Deploy to Vercel (10 minutes)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Complete Palvins build"
git push origin main
```

### Step 2: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import project → Select `palvins` repo
4. Click "Import"

### Step 3: Add Environment Variables
In Vercel dashboard:
1. Go to **Settings** → **Environment Variables**
2. Add all variables from `.env.local`
3. For each variable:
   - Name: `NEXT_PUBLIC_SUPABASE_URL`
   - Value: paste from Supabase
   - Select: Production
   - Click "Add"

Repeat for:
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_PAYSTACK_KEY`
- `PAYSTACK_SECRET_KEY`
- `NEXT_PUBLIC_FLUTTERWAVE_KEY`
- `FLUTTERWAVE_SECRET_KEY`
- `NEXT_PUBLIC_API_URL` (set to your Vercel URL once deployed)
- `DEFAULT_NGN_TO_INR_RATE`

### Step 4: Deploy
1. Click "Deploy"
2. Wait 3-5 minutes
3. ✅ Your site is live!

Your URLs will be:
- **Public Site:** `https://palvins.vercel.app` (or your domain)
- **Control Room:** `https://palvins.vercel.app/control/login`

---

## Phase 4: Setup Custom Domain (Optional)

### For www.palvins.com
1. Purchase domain from GoDaddy, Namecheap, etc.
2. In Vercel:
   - Go to **Settings** → **Domains**
   - Add domain: `palvins.com`
   - Add domain: `www.palvins.com`
3. Update DNS records (follow Vercel instructions)
4. Verify DNS ✅

---

## Phase 5: Setup Payment Gateways

### Paystack Integration
1. Go to [paystack.com](https://paystack.com)
2. Sign up
3. Verify business
4. Go to **Settings** → **API Keys**
5. Copy:
   - Public Key → `NEXT_PUBLIC_PAYSTACK_KEY`
   - Secret Key → `PAYSTACK_SECRET_KEY`
6. In Vercel, update env variables
7. Redeploy

### Flutterwave Integration
1. Go to [flutterwave.com](https://flutterwave.com)
2. Sign up
3. Go to **Settings** → **General**
4. Copy keys
5. Update env variables in Vercel

---

## Phase 6: Go Live Checklist

- [ ] Supabase project created & verified
- [ ] Database schema imported
- [ ] Test user created
- [ ] Environment variables configured
- [ ] Local testing completed
- [ ] Project pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Domain configured
- [ ] Payment gateways configured
- [ ] SSL certificate active (auto on Vercel)
- [ ] Email notifications setup
- [ ] Backup configured

---

## Project Structure & Key Features

### Public Website (www.palvins.com)
- ✅ Home page with hero
- ✅ Shop with products
- ✅ Shopping cart
- ✅ Checkout
- ✅ Order confirmation
- ✅ About page
- ✅ Contact page

### Control Room (admin dashboard)
- ✅ Login authentication
- ✅ Dashboard with KPIs
- ✅ Ingredients CRUD
- ✅ Recipes with cost calculations
- ✅ Products management
- ✅ Orders tracking
- ✅ Inventory management
- ✅ Settings & configuration

### Database (Supabase)
- ✅ Users & roles
- ✅ Ingredients with costing
- ✅ Recipes with auto-calculations
- ✅ Products
- ✅ Orders & order items
- ✅ Inventory tracking
- ✅ Customers
- ✅ Exchange rates

---

## Troubleshooting

### Issue: "Supabase connection failed"
- Check if Supabase project is running
- Verify URL in `.env.local`
- Verify anon key is correct

### Issue: "Button doesn't work"
- Check browser console for errors
- Verify auth user is logged in
- Check Supabase logs

### Issue: "Database schema error"
- Go to Supabase SQL Editor
- Check for errors in schema creation
- Run schema.sql line by line

### Issue: "Deployment fails"
- Check Vercel logs
- Verify environment variables are set
- Ensure Node version is 18+

---

## Support & Maintenance

### Regular Tasks
- Monitor Supabase usage
- Check order notifications
- Review inventory alerts
- Update exchange rates daily
- Backup database weekly

### Performance Tips
- Use Supabase indexes
- Enable CDN for images
- Monitor database query performance
- Cache product listings

### Security
- Enable 2FA on Supabase
- Rotate API keys monthly
- Use HTTPS only
- Validate all inputs
- Never commit `.env.local`

---

## Next Steps

1. **Send test invoice to customer** - Verify checkout works
2. **Get payment gateway approval** - For live transactions
3. **Setup email notifications** - Order confirmations
4. **Create landing page videos** - Show products in action
5. **Setup analytics** - Google Analytics for traffic
6. **Create social media** - Instagram, Facebook, TikTok
7. **Enable bulk ordering** - For restaurants/cafes
8. **Add review system** - Customer testimonials

---

## Quick Reference

| Component | URL | Login |
|-----------|-----|-------|
| Public Site | www.palvins.com | N/A |
| Control Room | www.palvins.com/control/login | admin@palvins.com / 123456 |
| Supabase | supabase.com | Your email |
| Vercel | vercel.com | GitHub account |

---

**Questions?** Contact: pallavikaurani9@gmail.com
**Phone:** +234 803 555 7284
**WhatsApp:** [Chat](https://wa.me/2348035557284)

---

🌿 **Happy launching with Palvins!** 🎉
