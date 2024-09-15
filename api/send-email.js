import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.log('Invalid request method:', req.method);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { fullName, email, phone, company, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    console.log('Missing required fields:', { fullName, email, phone, company, message });
    return res.status(400).json({ message: 'All fields are required.' });
  }

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
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(userMailOptions);
    console.log('Emails sent successfully');
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Error sending emails', error: error.message });
  }
}
