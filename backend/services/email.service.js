// backend/services/email.service.js
const nodemailer = require('nodemailer');

const sendVerificationEmail = async (user, token) => {
    // Basic email service template or your nodemailer setup
    console.log('Sending verification email to:', user.email, 'with token:', token);
    
    // Example using nodemailer if you have it configured:
    // const transporter = nodemailer.createTransport({ ... });
    // await transporter.sendMail({ ... });
};

module.exports = { sendVerificationEmail };