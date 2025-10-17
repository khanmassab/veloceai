import nodemailer from 'nodemailer'

interface BookingData {
  name: string
  email: string
  company?: string
  message?: string
  date: string
  time: string
}

// Create transporter (you'll need to configure this with your SMTP settings)
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Generate ICS file content for calendar invite
function generateICS(bookingData: BookingData): string {
  const startDate = new Date(`${bookingData.date}T${bookingData.time}:00`)
  const endDate = new Date(startDate.getTime() + 20 * 60 * 1000) // 20 minutes later
  
  const formatDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
  }

  return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//VeloceAI//Booking System//EN
BEGIN:VEVENT
UID:${Date.now()}@veloceai.co
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(startDate)}
DTEND:${formatDate(endDate)}
SUMMARY:VeloceAI Consultation Call
DESCRIPTION:20-minute consultation call with VeloceAI team.\\n\\nClient: ${bookingData.name}\\nCompany: ${bookingData.company || 'N/A'}\\nMessage: ${bookingData.message || 'No additional message'}
LOCATION:Online (Zoom link will be sent separately)
ORGANIZER:CN=VeloceAI:mailto:massab@veloceai.co
ATTENDEE:CN=${bookingData.name}:mailto:${bookingData.email}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`
}

// Send booking confirmation to client
export async function sendBookingConfirmation(bookingData: BookingData): Promise<boolean> {
  try {
    const transporter = createTransporter()
    const icsContent = generateICS(bookingData)
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: bookingData.email,
      subject: 'Booking Confirmed - VeloceAI Consultation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">Booking Confirmed!</h2>
          <p>Hi ${bookingData.name},</p>
          <p>Your consultation call with VeloceAI has been confirmed for:</p>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            <p><strong>Duration:</strong> 20 minutes</p>
            <p><strong>Format:</strong> Online (Zoom link will be sent 24 hours before)</p>
          </div>
          <p>We'll send you a Zoom link 24 hours before the call. In the meantime, feel free to prepare any questions about your AI support bot project.</p>
          <p>If you need to reschedule, please reply to this email.</p>
          <p>Best regards,<br>The VeloceAI Team</p>
        </div>
      `,
      attachments: [
        {
          filename: 'veloceai-consultation.ics',
          content: icsContent,
          contentType: 'text/calendar; charset=utf-8',
        },
      ],
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending booking confirmation:', error)
    return false
  }
}

// Send booking notification to VeloceAI team
export async function sendBookingNotification(bookingData: BookingData): Promise<boolean> {
  try {
    const transporter = createTransporter()
    
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: 'massab@veloceai.co',
      subject: `New Booking: ${bookingData.name} - ${bookingData.date} at ${bookingData.time}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0ea5e9;">New Booking Received</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Client Details:</h3>
            <p><strong>Name:</strong> ${bookingData.name}</p>
            <p><strong>Email:</strong> ${bookingData.email}</p>
            <p><strong>Company:</strong> ${bookingData.company || 'Not provided'}</p>
            <p><strong>Date:</strong> ${new Date(bookingData.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> ${bookingData.time}</p>
            ${bookingData.message ? `<p><strong>Message:</strong> ${bookingData.message}</p>` : ''}
          </div>
          <p>Please prepare the Zoom link and send it to the client 24 hours before the call.</p>
        </div>
      `,
    }

    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('Error sending booking notification:', error)
    return false
  }
}

// Send both emails
export async function sendBookingEmails(bookingData: BookingData): Promise<{ success: boolean; error?: string }> {
  try {
    const [confirmationSent, notificationSent] = await Promise.all([
      sendBookingConfirmation(bookingData),
      sendBookingNotification(bookingData)
    ])

    if (!confirmationSent || !notificationSent) {
      return {
        success: false,
        error: 'Failed to send one or more emails'
      }
    }

    return { success: true }
  } catch (error) {
    console.error('Error sending booking emails:', error)
    return {
      success: false,
      error: 'Failed to send emails'
    }
  }
}
