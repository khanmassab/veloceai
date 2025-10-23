# Vercel Deployment Fix

## 🚨 Current Issue
Vercel is building from `gh-pages` branch (static files) instead of `main` branch (source code).

## 🔧 Quick Fix Options

### Option 1: Change Vercel Branch (Recommended)
1. Go to Vercel Dashboard → Your Project
2. Settings → Git
3. Change "Production Branch" from `gh-pages` to `main`
4. Save and redeploy

### Option 2: Manual Redeploy
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" on latest deployment
3. Select "Use main branch"

### Option 3: Trigger New Deployment
```bash
# Make a small change and push to main
git add .
git commit -m "Trigger Vercel deployment from main branch"
git push origin main
```

## ✅ Expected Result
- Vercel builds from `main` branch
- Finds `package.json` with Next.js dependency
- Builds successfully with API routes
- Forms work with SMTP and reCAPTCHA

## 🔍 Verification
After deployment, check:
- [ ] Build logs show "Next.js detected"
- [ ] API routes work (`/api/contact`, `/api/booking`)
- [ ] Environment variables are loaded
- [ ] reCAPTCHA shows without "Invalid key type" error
