const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOtpEmail = async (user, otp) => {
  // Validate required environment variables before sending
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.BREVO_SENDER_EMAIL) {
    console.error('Brevo configuration error: Missing EMAIL_USER, EMAIL_PASS, or BREVO_SENDER_EMAIL in .env file');
    throw new Error('Email service configuration is incomplete.');
  }

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp-relay.brevo.com',
    port: parseInt(process.env.EMAIL_PORT, 10) || 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  console.log('>>> ATTEMPTING SMTP CONNECTION TO BREVO FOR:', user.email);

  const mailOptions = {
    from: `"${process.env.BREVO_SENDER_NAME || 'Home Services'}" <${process.env.BREVO_SENDER_EMAIL}>`,
    to: user.email,
    subject: 'Your Verification Code',
    text: `Hello ${user.firstName || 'User'}, your 6-digit verification code is: ${otp}. It expires in 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
        <h2>Welcome to Home Services!</h2>
        <p>Hi ${user.firstName || 'User'},</p>
        <p>Your email verification code is:</p>
        <h1 style="color: #ff6b35; letter-spacing: 2px;">${otp}</h1>
        <p>This code will expire in 5 minutes.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('>>> OTP EMAIL SENT SUCCESSFULLY:', info.messageId);
    return info;
  } catch (err) {
    console.error('>>> DETAILED BREVO SMTP ERROR:', {
      code: err.code,
      command: err.command,
      response: err.response,
      message: err.message,
    });
    throw err;
  }
};

module.exports = { sendOtpEmail };
