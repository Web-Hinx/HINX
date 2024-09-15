const nodemailer = require('nodemailer');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { fullName, email, phone, company, message } = req.body;

    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${fullName}`,
      text: `Phone: ${phone}\nCompany: ${company}\nMessage: ${message}`
    };

    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting us!',
      text: `Dear ${fullName},\n\nThank you for reaching out to us. We will get back to you soon.`
    };

    try {
      await transporter.sendMail(ownerMailOptions);
      await transporter.sendMail(userMailOptions);
      res.status(200).json({ message: 'Emails sent successfully!' });
    } catch (error) {
      console.error('Error sending emails:', error);
      res.status(500).json({ message: 'Error sending emails' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
