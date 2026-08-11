// backend/services/email.service.js
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (user, token) => {
    // 1. Create a transporter using your environment variables
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: Number(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER, // Matches SMTP_USER in your .env
            pass: process.env.SMTP_PASS, // Matches SMTP_PASS in your .env
        },
    });

    // 2. Build the verification link pointing to your frontend or backend route
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

    // 3. Compose the email options
    const mailOptions = {
        from: process.env.SMTP_FROM || '"Home Services" <syntaxstudio26@gmail.com>',
        to: user.email,
        subject: 'Verify Your Email Address',
        html: `
            <div style="font-family: Arial, sans-serif; padding: 20px;">
                <h2>Welcome to Home Services, ${user.firstName}!</h2>
                <p>Thank you for signing up. Please click the button below to verify your email address:</p>
                <a href="${verificationUrl}" style="background-color: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Verify Email</a>
                <p>If the button doesn't work, copy and paste this link into your browser:</p>
                <p><a href="${verificationUrl}">${verificationUrl}</a></p>
                <p>If you didn't request this, please ignore this email.</p>
            </div>
        `,
    };

    // 4. Send the email
    await transporter.sendMail(mailOptions);
    console.log('Verification email successfully sent to:', user.email);
};

module.exports = { sendVerificationEmail };
