# reCAPTCHA v3 Setup Guide

## 🎯 **What Changed**

Your application has been updated from reCAPTCHA v2 to reCAPTCHA v3:

### **Key Differences:**
- **v2**: Visible checkbox ("I'm not a robot")
- **v3**: Invisible, runs in background
- **v2**: Pass/fail verification
- **v3**: Returns a score (0.0 to 1.0) - we accept scores > 0.5

## 🔧 **Google reCAPTCHA Admin Setup**

### **Step 1: Create New reCAPTCHA v3 Site**
1. Go to [Google reCAPTCHA Admin](https://www.google.com/recaptcha/admin)
2. Click **"+ Create"**
3. **Label**: "VeloceAI Website"
4. **reCAPTCHA type**: Select **"reCAPTCHA v3"**
5. **Domains**: Add your domains:
   - `localhost` (for development)
   - `your-app.vercel.app` (your Vercel domain)
   - `veloceai.co` (if you have a custom domain)
6. Click **"Submit"**

### **Step 2: Get Your Keys**
After creating the site, you'll get:
- **Site Key** (public) - goes in `NEXT_PUBLIC_RECAPTCHA_SITE_KEY`
- **Secret Key** (private) - goes in `RECAPTCHA_SECRET_KEY`

## 🔑 **Vercel Environment Variables**

Add these to your Vercel project settings:

```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your-v3-site-key-here
RECAPTCHA_SECRET_KEY=your-v3-secret-key-here
```

## 🚀 **How reCAPTCHA v3 Works**

### **User Experience:**
1. **Invisible**: No checkbox, no user interaction needed
2. **Automatic**: Runs in background when form is submitted
3. **Badge**: Small reCAPTCHA badge appears in bottom-right corner

### **Technical Flow:**
1. User fills out form
2. User clicks submit
3. reCAPTCHA v3 automatically executes
4. Returns a token with score
5. Server verifies token and score
6. Form submits if score > 0.5

## 📊 **Score Interpretation**

- **1.0**: Very likely human
- **0.9**: Likely human
- **0.5**: Neutral (our threshold)
- **0.1**: Likely bot
- **0.0**: Very likely bot

## 🔍 **Testing**

### **Development:**
- reCAPTCHA is disabled on localhost
- Forms work without verification

### **Production:**
- reCAPTCHA v3 runs automatically
- Check browser console for verification logs
- Monitor Vercel function logs for score results

## ⚠️ **Important Notes**

1. **Score Threshold**: Currently set to 0.5 (adjustable)
2. **Domain Matching**: Keys must match your exact domain
3. **Invisible**: Users won't see a checkbox
4. **Badge**: reCAPTCHA badge will appear in bottom-right

## 🛠️ **Troubleshooting**

### **"Invalid key type" Error:**
- Make sure you created **reCAPTCHA v3** keys (not v2)
- Verify domain matches exactly

### **Low Scores:**
- Adjust threshold in API routes (currently 0.5)
- Monitor score patterns in logs

### **Not Working:**
- Check environment variables in Vercel
- Verify domain is added to reCAPTCHA admin
- Check browser console for errors

## 🎉 **Benefits of v3**

- **Better UX**: No user interaction required
- **More Accurate**: AI-powered bot detection
- **Continuous Protection**: Runs on every page load
- **Analytics**: Detailed score data in Google Admin
