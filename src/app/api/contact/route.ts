import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Async function to send emails in background
async function sendEmailsAsync({ 
  name, 
  email, 
  phone, 
  requirements 
}: { 
  name: string
  email: string
  phone: string
  requirements: string
}) {
  try {
    console.log('Starting background email sending...')

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    // Email content for the business owner
    const businessEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">New Contact Form Submission</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">VeloceAI Contact Form</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Contact Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Email:</strong> ${email}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Phone:</strong> ${phone}</p>
          </div>
          
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0;">Requirements</h3>
            <p style="margin: 0; line-height: 1.6; color: #555;">${requirements}</p>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${email}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Reply to Customer
            </a>
          </div>
        </div>
      </div>
    `

    // Email content for the customer (confirmation)
    const customerEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white;">
          <h1 style="margin: 0; font-size: 28px;">Thank You for Contacting VeloceAI!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">We'll get back to you within 24 hours</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Your Message</h2>
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin: 0; line-height: 1.6; color: #555;">${requirements}</p>
          </div>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">What's Next?</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Our team will review your requirements within 24 hours</li>
              <li>We'll schedule a call to discuss your AI chatbot needs</li>
              <li>Get a customized proposal for your business</li>
            </ul>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <p style="color: #666; font-size: 14px;">
              Questions? Email us at <a href="mailto:massab@veloceai.co" style="color: #667eea;">massab@veloceai.co</a>
            </p>
          </div>
        </div>
      </div>
    `

    // Send both emails in parallel for better performance
    await Promise.all([
      // Send to business owner
      transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || 'massab@veloceai.co',
        subject: `New Contact Form Submission from ${name}`,
        html: businessEmailHtml,
      }),
      // Send confirmation to customer
      transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'Thank you for contacting VeloceAI!',
        html: customerEmailHtml,
      })
    ])

    console.log('✅ Background emails sent successfully')
  } catch (error) {
    console.error('❌ Background email sending failed:', error)
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, requirements, recaptchaToken } = await request.json()

    // Validate required fields
    if (!name || !email || !phone || !requirements) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Verify reCAPTCHA (skip on localhost)
    const isLocalhost = request.headers.get('host')?.includes('localhost') || request.headers.get('host')?.includes('127.0.0.1')
    
    if (!isLocalhost && recaptchaToken) {
      try {
        const recaptchaResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
        })

        const recaptchaData = await recaptchaResponse.json()
        
        console.log('reCAPTCHA v3 verification result:', recaptchaData)
        
        // v3 returns a score (0.0 to 1.0), typically accept scores > 0.5
        if (!recaptchaData.success || recaptchaData.score < 0.5) {
          return NextResponse.json(
            { 
              error: 'reCAPTCHA verification failed', 
              details: recaptchaData['error-codes'] || `Score too low: ${recaptchaData.score}` 
            },
            { status: 400 }
          )
        }
      } catch (error) {
        console.error('reCAPTCHA verification error:', error)
        return NextResponse.json(
          { error: 'reCAPTCHA verification failed' },
          { status: 400 }
        )
      }
    }

    // Send emails synchronously to ensure they're sent
    try {
      await sendEmailsAsync({ name, email, phone, requirements })
      console.log('✅ Contact emails sent successfully')
    } catch (error) {
      console.error('❌ Contact email sending failed:', error)
      return NextResponse.json(
        { 
          error: 'Failed to send confirmation email',
          details: 'Please try again or contact us directly'
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { 
        message: 'Form submitted successfully! We\'ll contact you within 24 hours.',
        status: 'sent'
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { 
        error: 'Failed to send email',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
