import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: NextRequest) {
  try {
    const { name, email, company, message, date, time, recaptchaToken } = await request.json()

    // Validate required fields
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Name, email, date, and time are required' },
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

    // Debug environment variables
    console.log('SMTP_HOST:', process.env.SMTP_HOST)
    console.log('SMTP_USER:', process.env.SMTP_USER)
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? 'Set' : 'Not set')

    // Create transporter using environment variables
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
          <h1 style="margin: 0; font-size: 28px;">New Booking Request</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">VeloceAI Consultation Booking</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Booking Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Name:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Email:</strong> ${email}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Company:</strong> ${company || 'Not provided'}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Time:</strong> ${time}</p>
          </div>
          
          ${message ? `
          <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h3 style="color: #333; margin-top: 0;">Message</h3>
            <p style="margin: 0; line-height: 1.6; color: #555;">${message}</p>
          </div>
          ` : ''}
          
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
          <h1 style="margin: 0; font-size: 28px;">Booking Confirmed!</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Your consultation with VeloceAI</p>
        </div>
        
        <div style="padding: 30px; background: #f8f9fa;">
          <h2 style="color: #333; margin-top: 0;">Your Consultation Details</h2>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Date:</strong> ${new Date(date).toLocaleDateString()}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Time:</strong> ${time}</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Duration:</strong> 20 minutes</p>
            <p style="margin: 0 0 10px 0;"><strong style="color: #667eea;">Type:</strong> AI Support Bot Consultation</p>
          </div>
          
          <div style="background: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;">
            <h3 style="color: #333; margin-top: 0;">What to Expect</h3>
            <ul style="color: #555; line-height: 1.6;">
              <li>Discussion about your current support challenges</li>
              <li>AI chatbot solution overview and benefits</li>
              <li>Custom implementation timeline for your business</li>
              <li>Pricing and next steps</li>
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

    // Send emails in parallel to avoid delays
    console.log('Sending booking emails...')
    
    const emailPromises = [
      // Send to business owner
      transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: process.env.CONTACT_EMAIL || 'massab@veloceai.co',
        subject: `New Booking Request from ${name} - ${new Date(date).toLocaleDateString()} at ${time}`,
        html: businessEmailHtml,
      }),
      // Send confirmation to customer
      transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: email,
        subject: 'Booking Confirmed - VeloceAI Consultation',
        html: customerEmailHtml,
      })
    ]

    await Promise.all(emailPromises)
    console.log('✅ Booking emails sent successfully')

    return NextResponse.json(
      { message: 'Booking confirmed and emails sent successfully' },
      { status: 200 }
    )

  } catch (error) {
    console.error('Error processing booking:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process booking',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
