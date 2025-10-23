# Deployment Guide

This project supports dual deployment:
1. **GitHub Pages** - Static site (forms won't work)
2. **Vercel** - Full Next.js with API routes (forms work)

## 🚀 Vercel Deployment (Recommended)

### Step 1: Deploy to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js

### Step 2: Configure Environment Variables
In Vercel dashboard, go to your project → Settings → Environment Variables:

```
SMTP_HOST=your-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@domain.com
SMTP_PASS=your-app-password
SMTP_SECURE=false
SMTP_FROM=noreply@veloceai.co
CONTACT_EMAIL=massab@veloceai.co
RECAPTCHA_SECRET_KEY=your-recaptcha-secret
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
NEXT_PUBLIC_GA_ID=your-ga-id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-recaptcha-site-key
```

### Step 3: Deploy
- Vercel will automatically deploy
- Your forms will work with SMTP and reCAPTCHA
- Custom domain can be added in Vercel settings

## 📄 GitHub Pages Deployment (Static)

### Current Setup
Your GitHub Actions workflow already handles this:
- Builds static site with `output: 'export'`
- Deploys to GitHub Pages
- Forms won't work (no server-side processing)

### To Update GitHub Pages
```bash
git add .
git commit -m "Update site"
git push origin main
```

## 🔧 Local Development

### For Vercel-style development (with API routes):
```bash
npm run dev
```

### For GitHub Pages-style development (static):
```bash
npm run build:github
```

## 📊 Comparison

| Feature | GitHub Pages | Vercel |
|---------|-------------|--------|
| Static Site | ✅ | ✅ |
| API Routes | ❌ | ✅ |
| SMTP Emails | ❌ | ✅ |
| reCAPTCHA | ❌ | ✅ |
| Custom Domain | ✅ | ✅ |
| Cost | Free | Free (hobby) |
| Build Time | ~2min | ~1min |

## 🎯 Recommendation

**Use Vercel for production** - it supports all your features and is easier to manage.

Keep GitHub Pages as a backup or for documentation purposes.
