require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sendEmail = require('./api/send-email');  // import email handler

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// API route for sending email
app.post('https://hinx.vercel.app/api/send-email', sendEmail);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
