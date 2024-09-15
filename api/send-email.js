import nodemailer from 'nodemailer';  // Updated import statement
import { config } from 'dotenv';  // Updated import statement

config();  // Initialize dotenv

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName, email, phone, company, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const ownerMailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `You have a new message from ${fullName} (${email}):
    Phone: ${phone}
    Company: ${company}
    Message: ${message}`
  };

  const userMailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Thank you for contacting us!',
    text: `Dear ${fullName},

    Thank you for reaching out to us. We have received your message and will get back to you within the next working day or two.

    Best regards,`
  };

  try {
    // Send email to the owner
    await transporter.sendMail(ownerMailOptions);
    
    // Send confirmation email to the user
    await transporter.sendMail(userMailOptions);

    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Error sending emails', error: error.message });
  }
}

