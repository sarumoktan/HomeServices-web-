// backend/services/email.service.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendVerificationEmail = async (user, token) => {
  const verifyLink = `${process.env.CLIENT_URL}/verify-email?token=${token}`;

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: user.email,
    subject: 'Verify your Home Services account',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 480px; margin: auto;">
        <h2>Hi ${user.firstName},</h2>
        <p>Thanks for registering with Home Services. Please verify your email address to activate your account.</p>
        <p style="margin: 24px 0;">
          <a href="${verifyLink}"
             style="background:#2563eb;color:#fff;padding:12px 20px;border-radius:6px;text-decoration:none;">
            Verify Email
          </a>
        </p>
        <p>Or copy this link into your browser:</p>
        <p style="word-break:break-all;">${verifyLink}</p>
        <p>This link expires in 24 hours.</p>
      </div>
    `,
  });
};

module.exports = { sendVerificationEmail };
