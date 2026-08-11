// backend/modules/auth/auth.service.js
const User = require('./auth.model');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils/token.util');
const { sendVerificationEmail } = require('../../services/email.service');
const crypto = require('crypto');

class AppError extends Error {
  constructor(message, statusCode, code = 'ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}

//Register Code (registerUser)

const registerUser = async ({ firstName, lastName, email, phone, password, role, serviceType, hourlyRate }) => {
  //Check if the email is already used by someone else
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new AppError('Email is already registered.', 400, 'EMAIL_EXISTS');
  }
//Hash the password for security so it's not saved in plain text
  const hashedPassword = await bcrypt.hash(password, 10);
  const verificationToken = crypto.randomBytes(32).toString('hex');//Create a unique token for email verification

  //Save the new user into the database
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
    role: role || 'user',
    serviceType: role === 'provider' ? serviceType : null,
    hourlyRate: role === 'provider' ? hourlyRate : null,
    verificationToken,
    isVerified: false,
  });

  //Send the verification email to the user
  await sendVerificationEmail(user, verificationToken);

  //Return basic user info (no passwords or tokens)
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
};

//verifies a user's account using the token sent to their email
const verifyEmail = async (token) => {
  const user = await User.findOne({ where: { verificationToken: token } });
  if (!user) {
    throw new AppError('Invalid or expired verification token.', 400, 'INVALID_TOKEN');
  }

  if (user.isVerified) {
    return { alreadyVerified: true };
  }

  user.isVerified = true;
  user.verificationToken = null;
  await user.save();

  return { alreadyVerified: false };
};

//// Resends a new verification email if the user asks for it
const resendVerificationEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('User not found with this email.', 404, 'NOT_FOUND');
  }

  if (user.isVerified) {
    throw new AppError('Email is already verified.', 400, 'ALREADY_VERIFIED');
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  user.verificationToken = verificationToken;
  await user.save();

  await sendVerificationEmail(user, verificationToken);
};
//Login Code (loginUser)
const loginUser = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
  }

  //Check if the entered password matches the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AppError('Invalid email or password.', 401, 'INVALID_CREDENTIALS');
  }

//Block login if the user hasn't verified their email yet
  if (!user.isVerified) {
    throw new AppError('Please verify your email before logging in.', 403, 'NOT_VERIFIED');
  }

  //enerate an access token for the user session
  const token = generateToken(user.id);

  //Return the token and user details
  return {
    token,
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    },
  };
};

module.exports = {
  AppError,
  registerUser,
  verifyEmail,
  resendVerificationEmail,
  loginUser,
};