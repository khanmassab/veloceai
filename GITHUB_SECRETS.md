# GitHub Secrets Configuration

This document outlines the environment variables that need to be configured as GitHub Secrets for the deployment workflow.

## Required GitHub Secrets

Add these secrets in your GitHub repository: **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

### Public Environment Variables (NEXT_PUBLIC_*)
These are accessible in the browser and will be included in the static build.

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `NEXT_PUBLIC_SITE_URL` | Your website URL | `https://veloceai.co` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID (optional) | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | reCAPTCHA Site Key | `6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI` |

### Server-side Environment Variables
These are used for API routes and server-side functionality.

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | SMTP server port | `587` |
| `SMTP_USER` | SMTP username/email | `your-email@gmail.com` |
| `SMTP_PASS` | SMTP password/app password | `your-app-password` |
| `SMTP_SECURE` | Use secure connection (true/false) | `false` |
| `SMTP_FROM` | From email address | `noreply@veloceai.co` |
| `CONTACT_EMAIL` | Contact email for form submissions | `massab@veloceai.co` |
| `RECAPTCHA_SECRET_KEY` | reCAPTCHA Secret Key | `6LeIxAcTAAAAAGG-vFI1TnRWxMZNFuojJ4WifJWe` |

## How to Add Secrets

1. Go to your GitHub repository
2. Click **Settings** tab
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter the secret name and value
6. Click **Add secret**

## Notes

- **NEXT_PUBLIC_*** variables are embedded in the static build and visible to users
- Server-side variables are only used during build time for API routes
- Make sure to use the exact secret names as listed above
- All secrets are optional except for the ones your application actually uses

## Testing

After adding the secrets, push a change to trigger the deployment workflow and verify that:
1. The build completes successfully
2. Environment variables are properly injected
3. Your application functions correctly with the new configuration
