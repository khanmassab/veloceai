# Sanity CMS Setup Guide

This guide will help you set up Sanity CMS for your blog with automatic Vercel deployments.

## Prerequisites

- Node.js and npm installed
- Vercel account
- Sanity account

## Step 1: Create Sanity Project

1. Go to [sanity.io](https://sanity.io) and create an account
2. Create a new project:
   - Project name: `veloce-blog-cms`
   - Dataset: `production`
   - Template: `Blog (schema)`

## Step 2: Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01

# Webhook Configuration
SANITY_API_TOKEN=your-sanity-api-token
SANITY_WEBHOOK_SECRET=your-webhook-secret
```

## Step 3: Get Sanity API Token

1. Go to your Sanity project dashboard
2. Navigate to **API** → **Tokens**
3. Click **Add API token**
4. Name: `Vercel Webhook Token`
5. Permissions: **Editor** (for content management)
6. Copy the token and add it to your environment variables

## Step 4: Configure Webhook

1. In your Sanity project, go to **API** → **Webhooks**
2. Click **Create webhook**
3. Configure the webhook:
   - **Name**: `Vercel Revalidation`
   - **URL**: `https://your-domain.com/api/revalidate?secret=your-webhook-secret`
   - **Dataset**: `production`
   - **Trigger on**: `Create`, `Update`, `Delete`
   - **Filter**: `_type == "blogPost"`

## Step 5: Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variables in Vercel dashboard:
   - Go to **Settings** → **Environment Variables**
   - Add all the variables from your `.env.local`

## Step 6: Access Sanity Studio

Once deployed, you can access the Sanity Studio at:
- **Local development**: `http://localhost:3000/studio`
- **Production**: `https://your-domain.com/studio`

## Step 7: Create Your First Content

1. Go to your Studio URL
2. Create an **Author**:
   - Name: `Massab Khan`
   - Bio: Your bio
   - Avatar: Upload or use external URL
   - Social links: Add your social profiles

3. Create a **Blog Post**:
   - Title: Your post title
   - Slug: Auto-generated from title
   - Author: Select the author you created
   - Content: Use the rich text editor
   - Tags: Add relevant tags
   - Categories: Add categories
   - Cover Image: Upload or use external URL
   - Published: Toggle to publish

## Step 8: Test the Integration

1. Create a test blog post in Sanity Studio
2. Publish it
3. Check your website to see if it appears
4. Verify the webhook triggered a Vercel deployment

## Content Management Features

### Blog Posts
- Rich text editor with formatting options
- Code blocks with syntax highlighting
- Image uploads with optimization
- External image URL support
- Tags and categories
- Publication status control

### Authors
- Author profiles with bios
- Avatar images (Sanity or external)
- Social media links
- Author management

### Categories & Tags
- Organized content categorization
- Easy filtering and navigation
- SEO-friendly URLs

## Webhook Configuration Details

The webhook automatically triggers Vercel revalidation when:
- Blog posts are created, updated, or deleted
- Authors are modified
- Categories or tags are changed

This ensures your website stays in sync with your CMS content.

## Troubleshooting

### Studio Not Loading
- Check your environment variables
- Ensure Sanity project ID is correct
- Verify dataset name matches

### Webhook Not Working
- Check webhook URL is correct
- Verify webhook secret matches
- Ensure Vercel deployment is successful

### Content Not Appearing
- Check if content is published
- Verify webhook triggered revalidation
- Check browser console for errors

## Support

For issues with:
- **Sanity**: Check [Sanity documentation](https://www.sanity.io/docs)
- **Vercel**: Check [Vercel documentation](https://vercel.com/docs)
- **This integration**: Check the project repository

## Next Steps

1. Customize the Studio appearance in `sanity.config.ts`
2. Add more content types as needed
3. Set up content workflows and permissions
4. Configure additional webhooks for other content types
