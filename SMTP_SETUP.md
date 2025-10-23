# SMTP Setup for Contact Form

## Environment Variables Required

Create a `.env.local` file in the root directory with the following variables:

```env
# SMTP Configuration for Contact Form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=VeloceAI <your-email@gmail.com>

# Contact Form Settings
CONTACT_EMAIL=massab@veloceai.co
```

## Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate an App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Use this password as `SMTP_PASS`

3. **Configure the variables**:
   - `SMTP_USER`: Your Gmail address
   - `SMTP_PASS`: The app password (not your regular password)
   - `SMTP_FROM`: Your name and email for the "From" field

## Other Email Providers

### Outlook/Hotmail
```env
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Yahoo
```env
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_SECURE=false
```

### Custom SMTP
```env
SMTP_HOST=your-smtp-server.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-username
SMTP_PASS=your-password
```

## Testing

After setting up the environment variables, restart your development server and test the contact form. You should receive:
1. A notification email at the `CONTACT_EMAIL` address
2. A confirmation email sent to the customer

## Security Notes

- Never commit `.env.local` to version control
- Use app passwords instead of regular passwords
- Consider using a dedicated email service like SendGrid for production
