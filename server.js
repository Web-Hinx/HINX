import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'dotenv';
import sendEmail from './api/send-email.js';

config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files if needed
app.use(express.static('public'));

// POST endpoint for sending emails
app.post('/api/send-email', sendEmail);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


