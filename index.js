const express = require('express');
const app = express();
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config()
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('API is running');
});

app.post('/sendmail', async (req, res) => {
    const { name, email, subject, message } = req.body;

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASS,
                
            },
            
        });
        console.log(transporter);
        const mailOptions = {
            from: email, // Use the sender's email from req.body
            to: 'yasir.codeblue@gmail.com', // replace with your email
            subject: subject,
            html: `<h1>Hello From ${name},</h1>
            <p>Sender Email: ${email}</p> 
            <p>Subject: ${subject}</p>
            <p>Sender Message: ${message}</p> 
            `,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                res.status(500).json({ status: 500, error: 'Failed to send email. Please try again.' });
            } else {
                console.log('Email sent:', info.response);
                res.status(200).json({ status: 200, message: 'Email sent successfully!' });
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ status: 500, error: 'Internal server error.' });
    }
});

const port = 8000;
app.listen(port, () => {
    console.log(`Connected on port ${port}`);
});
