import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const transporter = nodemailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const createMailOptions = (fullName, email, phone, company, message) => {
  return {
    ownerMailOptions: {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: 'New Contact Form Submission',
      text: `You have a new message from ${fullName} (${email}):
      Phone: ${phone}
      Company: ${company}
      Message: ${message}`
    },
    userMailOptions: {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting us!',
      text: `Dear ${fullName},

      Thank you for reaching out to us. We have received your message and will get back to you within the next working day or two.

      Best regards,`
    }
  };
};

const sendEmail = async (req, res) => {
  const { fullName, email, phone, company, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const { ownerMailOptions, userMailOptions } = createMailOptions(fullName, email, phone, company, message);

  try {
    await transporter.sendMail(ownerMailOptions);
    await transporter.sendMail(userMailOptions);
    res.status(200).json({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error occurred while sending email:', error.stack);  // log full error
    res.status(500).json({ message: 'Error sending emails', error: error.stack });
  }
};

export default sendEmail;

