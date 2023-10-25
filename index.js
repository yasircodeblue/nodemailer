const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

// Body parser middleware
app.use(express.json());

// Email sending logic
app.post('/sendmail', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Configure nodemailer with your email service provider
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
                pass: process.env.PASS, // Your email password or app-specific password
      },
    });

    // Email options
    const mailOptions = {
      from: email,
       to: process.env.SEND_TO, // Recipient email address
      subject: subject,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent: ' + info.response);

    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email.' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
