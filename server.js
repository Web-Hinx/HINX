const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

app.post('https://github.com/Web-Hinx/hinx/blob/main/api/send-email.js', (req, res) => {
  const { fullName, email, phone, company, message } = req.body;

  if (!fullName || !email || !phone || !message) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  const transporter = nodemailer.createTransport({
    service: 'hotmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Contact Form Submission',
    text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nMessage: ${message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      return res.status(500).json({ message: 'Failed to send email.' });
    }
    res.json({ message: 'Email sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
