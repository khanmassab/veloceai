# Quick Sanity Setup Guide

The Sanity Studio is showing CORS errors because you need to set up your actual Sanity project. Here's how to fix this:

## Step 1: Create Sanity Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Click "Create new project"
3. Choose "Blog (schema)" template
4. Set project name: `veloce-blog-cms`
5. Set dataset: `production`

## Step 2: Get Your Project ID

1. In your Sanity project dashboard, go to **Settings** → **API**
2. Copy your **Project ID** (it will look like `abc123def`)

## Step 3: Create Environment File

Create a `.env.local` file in your project root:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Webhook Configuration (optional for now)
SANITY_API_TOKEN=your-sanity-token
SANITY_WEBHOOK_SECRET=your-webhook-secret
```

## Step 4: Restart Development Server

```bash
npm run dev
```

## Step 5: Access Studio

Visit `http://localhost:3000/studio/` and you should see the Sanity Studio interface.

## Current Issue

The Studio is trying to connect to a placeholder project ID (`qo9d0b59`) which doesn't exist. Once you set up your real Sanity project and update the environment variables, the CORS errors will be resolved.

## Next Steps After Setup

1. Create your first author in the Studio
2. Create your first blog post
3. Set up the webhook for automatic deployments
4. Deploy to Vercel

The integration is ready - you just need to connect it to your actual Sanity project!
