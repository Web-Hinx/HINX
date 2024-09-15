require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; 


app.use(cors());
app.use(bodyParser.json());


app.use(express.static('public'));


app.post('/send-email', (req, res) => {
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

  
  transporter.sendMail(ownerMailOptions, (error, info) => {
    if (error) {
      console.error('Error occurred:', error);
      return res.status(500).send('Error: Unable to send the message.');
    }
    
   
    transporter.sendMail(userMailOptions, (error, info) => {
      if (error) {
        console.error('Error occurred while sending confirmation email:', error);
        return res.status(500).send('Error: Unable to send confirmation email.');
      }
      res.send('Your message has been sent successfully and a confirmation email has been sent to you.');
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
