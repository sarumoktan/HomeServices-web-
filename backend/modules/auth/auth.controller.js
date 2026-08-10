// backend/modules/auth/auth.controller.js
const {
  AppError,
  registerUser,
  verifyEmail,
  resendVerificationEmail,
  loginUser,
} = require('./auth.service');

// Register a new user
const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role } = req.body;

// Call service to register the user
    const user = await registerUser({ firstName, lastName, email, phone, password, role });

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Please check your email to verify your account.',
      data: user,
    });
    // Handle expected errors
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    }
    console.error('Register error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};
// Verify user's email using a token
const verifyEmailController = async (req, res) => {
  try {
    const { token } = req.params;
    const result = await verifyEmail(token);
// Check if the email was already verified previously 

    if (result.alreadyVerified) {
      return res.status(200).json({ success: true, message: 'Email is already verified.' });
    }

    return res.status(200).json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    }
    console.error('Verify email error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};
// Resend the email verification link
const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    await resendVerificationEmail(email);

    return res.status(200).json({ success: true, message: 'Verification email sent.' });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    }
    console.error('Resend verification error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};
// Log in an existing user
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginUser(email, password);

    return res.status(200).json({
      success: true,
      message: 'Login successful',
      data: { token, user },
    });
  } catch (err) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({ success: false, code: err.code, message: err.message });
    }
    console.error('Login error:', err);
    return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
  }
};
// Export controller functions
module.exports = {
  register,
  verifyEmailController,
  resendVerification,
  login,
};
