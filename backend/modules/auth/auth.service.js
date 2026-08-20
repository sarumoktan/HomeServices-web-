const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('./auth.model'); 
const { sendOtpEmail } = require('../../utils/email');

class AppError extends Error {
  constructor(message, statusCode, code = 'ERROR', details = {}) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }
}

// Register User Service
const registerUser = async (userData) => {
  const { firstName, lastName, email, phone, password, role, serviceType, hourlyRate } = userData;

  try {
    // 1. Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new AppError('An account with this email already exists.', 400, 'EMAIL_EXISTS');
    }

    // 2. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Generate 6-digit OTP and expiry (5 minutes)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    // 4. Create user in database (unverified by default)
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      role: role || 'user',
      serviceType: serviceType || null,
      hourlyRate: hourlyRate || null,
      otpCode: otp,
      otpExpiresAt: otpExpires,
      isVerified: false,
    });

    // 5. Send the OTP email via Brevo SMTP (Non-blocking catch to prevent 500 crash)
    try {
      await sendOtpEmail(newUser, otp);
    } catch (emailErr) {
      console.error('Failed to dispatch OTP email during registration:', emailErr.message);
      // Registration will continue successfully; user can use "Resend OTP" if needed.
    }

    // Return user data without password
    const userResponse = newUser.toJSON();
    delete userResponse.password;
    delete userResponse.otpCode;
    
    return userResponse;
  } catch (dbErr) {
    if (dbErr.name === 'SequelizeUniqueConstraintError') {
      const field = dbErr.errors[0]?.path || 'field';
      throw new AppError(`An account with this ${field} already exists.`, 400, 'DUPLICATE_FIELD');
    }
    if (dbErr instanceof AppError) {
      throw dbErr;
    }
    console.error('Database error during user registration:', dbErr);
    throw new AppError('Database connection error or table missing. Please check server logs.', 500, 'DATABASE_ERROR');
  }
};

// Verify OTP Service
const verifyOtp = async (email, otp) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
  }

  if (user.isVerified) {
    return { alreadyVerified: true };
  }

  if (!user.otpCode || user.otpCode !== otp) {
    throw new AppError('Invalid verification code.', 400, 'INVALID_OTP');
  }

  if (user.otpExpiresAt && new Date() > new Date(user.otpExpiresAt)) {
    throw new AppError('Verification code has expired. Please request a new one.', 400, 'OTP_EXPIRED');
  }

  // Mark user as verified and clear OTP fields
  user.isVerified = true;
  user.otpCode = null;
  user.otpExpiresAt = null;
  await user.save();

  return { success: true };
};

// Resend OTP Service
const resendOtp = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
  }

  if (user.isVerified) {
    throw new AppError('This email is already verified.', 400, 'ALREADY_VERIFIED');
  }

  // Generate new 6-digit OTP & expiry
  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const newExpiry = new Date(Date.now() + 5 * 60 * 1000);

  user.otpCode = newOtp;
  user.otpExpiresAt = newExpiry;
  await user.save();

  // Send new OTP email
  try {
    await sendOtpEmail(user, newOtp);
  } catch (emailErr) {
    console.error('Failed to resend OTP email:', emailErr.message);
    throw new AppError('Failed to send verification email. Please try again later.', 500, 'EMAIL_SEND_FAILED');
  }

  return { success: true };
};

// Login User Service
const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
  }

  if (!user.isVerified) {
    throw new AppError('Please verify your email before logging in.', 403, 'NOT_VERIFIED');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET || 'fallback_secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

  const userResponse = user.toJSON();
  delete userResponse.password;
  delete userResponse.otpCode;

  return { token, user: userResponse };
};

module.exports = {
  AppError,
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
};