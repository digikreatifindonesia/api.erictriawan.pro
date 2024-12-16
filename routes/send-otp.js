const redis = require('redis');
const redisClient = redis.createClient(process.env.REDIS_URL);
const twilio = require('twilio');

app.post('/customer/send-otp', async (req, res) => {
    const { phone } = req.body;

    if (!phone) return res.status(400).json({ message: 'Phone number is required' });

    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
        const ttl = 300; // OTP valid for 5 minutes
        await redisClient.setEx(phone, ttl, otp); // Cache OTP in Redis

        // Send OTP via WhatsApp/SMS using Twilio
        await twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
            .messages.create({
                body: `Your OTP is ${otp}`,
                from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
                to: `whatsapp:${phone}`, // Or SMS instead of WhatsApp if needed
            });

        res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
        console.error('Error sending OTP:', error.message);
        res.status(500).json({ message: 'Failed to send OTP' });
    }
});
