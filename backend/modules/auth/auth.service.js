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

// Helper to determine query by email or phone
const getIdentifierQuery = (identifier) => {
  return identifier && identifier.includes('@') ? { email: identifier } : { phone: identifier };
};

// Register User Service
const registerUser = async (userData) => {
  const { firstName, lastName, email, phone, password, role, serviceType, hourlyRate } = userData;

  try {
    const identifierKey = email ? { email } : { phone };
    const existingUser = await User.findOne({ where: identifierKey });
    if (existingUser) {
      throw new AppError('An account with this credential already exists.', 400, 'USER_EXISTS');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

    const newUser = await User.create({
      firstName,
      lastName,
      email: email || null,
      phone: phone || null,
      password: hashedPassword,
      role: role || 'user',
      serviceType: serviceType || null,
      hourlyRate: hourlyRate || null,
      otpCode: otp,
      otpExpiresAt: otpExpires,
      isVerified: false,
    });

    try {
      if (email) await sendOtpEmail(newUser, otp);
    } catch (emailErr) {
      console.error('Failed to dispatch OTP email:', emailErr.message);
    }

    const userResponse = newUser.toJSON();
    delete userResponse.password;
    delete userResponse.otpCode;
    
    return userResponse;
  } catch (dbErr) {
    if (dbErr.name === 'SequelizeUniqueConstraintError') {
      const field = dbErr.errors[0]?.path || 'field';
      throw new AppError(`An account with this ${field} already exists.`, 400, 'DUPLICATE_FIELD');
    }
    if (dbErr instanceof AppError) throw dbErr;
    console.error('Database error during registration:', dbErr);
    throw new AppError('Database connection error.', 500, 'DATABASE_ERROR');
  }
};

// Verify OTP Service (Supports Email or Phone)
const verifyOtp = async (identifier, otp) => {
  const user = await User.findOne({ where: getIdentifierQuery(identifier) });
  if (!user) {
    throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
  }

  console.log("DEBUG -> DB Code:", user.otpCode, "| Typed:", otp);

  if (user.isVerified) return { alreadyVerified: true };

  if (user.otpExpiresAt && new Date() > new Date(user.otpExpiresAt)) {
    throw new AppError('Verification code expired.', 400, 'OTP_EXPIRED');
  }

  if (!user.otpCode || user.otpCode !== otp.toString().trim()) {
    throw new AppError('Invalid verification code.', 400, 'INVALID_OTP');
  }

  user.isVerified = true;
  user.otpCode = null;
  user.otpExpiresAt = null;
  await user.save();

  return { success: true };
};

// Resend OTP Service (Supports Email or Phone)
const resendOtp = async (identifier) => {
  const user = await User.findOne({ where: getIdentifierQuery(identifier) });
  if (!user) {
    throw new AppError('User not found.', 404, 'USER_NOT_FOUND');
  }

  if (user.isVerified) {
    throw new AppError('Account already verified.', 400, 'ALREADY_VERIFIED');
  }

  const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
  const newExpiry = new Date(Date.now() + 5 * 60 * 1000);

  user.otpCode = newOtp;
  user.otpExpiresAt = newExpiry;
  await user.save();

  try {
    if (user.email) await sendOtpEmail(user, newOtp);
  } catch (emailErr) {
    console.error('Failed to resend OTP:', emailErr.message);
    throw new AppError('Failed to send verification email.', 500, 'EMAIL_FAILED');
  }

  return { success: true };
};

// Login User Service (Supports Email or Phone)
const loginUser = async (identifier, password) => {
  const user = await User.findOne({ where: getIdentifierQuery(identifier) });
  if (!user) {
    throw new AppError('Invalid credentials.', 401, 'INVALID_CREDENTIALS');
  }

  if (!user.isVerified) {
    throw new AppError('Please verify your account first.', 403, 'NOT_VERIFIED');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new AppError('Invalid credentials.', 401, 'INVALID_CREDENTIALS');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, phone: user.phone, role: user.role },
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