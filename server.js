const express = require('express');
const cors = require('cors');
const twilio = require('twilio');
require('dotenv').config();

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Twilio Configuration
// REPLACE THESE WITH YOUR ACTUAL CREDENTIALS IN A .env FILE
const accountSid = process.env.TWILIO_ACCOUNT_SID || 'YOUR_TWILIO_ACCOUNT_SID';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'YOUR_TWILIO_AUTH_TOKEN';
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER || 'YOUR_TWILIO_PHONE_NUMBER';

const client = new twilio(accountSid, authToken);

// SMS Endpoint
app.post('/api/send-sms', async (req, res) => {
    const { name, phone, service, date, time } = req.body;

    if (!name || !phone || !service || !date || !time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const message = await client.messages.create({
            body: `Booking Confirmed!\n\nHi ${name}, your appointment for ${service} on ${date} at ${time} at PureHearted Studioz has been confirmed.\n\nLocation: 25 Mutual St, Downtown Toronto`,
            from: twilioPhoneNumber,
            to: phone
        });

        console.log(`SMS sent to ${phone}: ${message.sid}`);
        res.status(200).json({ success: true, messageId: message.sid });
    } catch (error) {
        console.error('Error sending SMS:', error);
        res.status(500).json({ error: 'Failed to send SMS', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
