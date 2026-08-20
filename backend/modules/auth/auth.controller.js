const {
  AppError,
  registerUser,
  verifyOtp,
  resendOtp,
  loginUser,
} = require('./auth.service');

const handleError = (res, err, context) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      code: err.code,
      message: err.message,
      ...err.details,
    });
  }
  console.error(`${context} error:`, err);
  return res.status(500).json({ success: false, message: 'Something went wrong. Please try again.' });
};

const register = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, role, serviceType, hourlyRate } = req.body;
    const user = await registerUser({ firstName, lastName, email, phone, password, role, serviceType, hourlyRate });

    return res.status(201).json({
      success: true,
      message: 'Registration successful! Enter the 6-digit code sent to your email.',
      data: user,
    });
  } catch (err) {
    return handleError(res, err, 'Register');
  }
};

const verifyOtpController = async (req, res) => {
  console.log("reached here");
  try {
    const { email, otp } = req.body;
    const result = await verifyOtp(email, otp);

    if (result.alreadyVerified) {
      return res.status(200).json({ success: true, message: 'Email is already verified.' });
    }

    return res.status(200).json({ success: true, message: 'Email verified successfully.' });
  } catch (err) {
    return handleError(res, err, 'Verify OTP');
  }
};

const resendOtpController = async (req, res) => {
  try {
    const { email } = req.body;
    await resendOtp(email);

    return res.status(200).json({ success: true, message: 'A new code has been sent to your email.' });
  } catch (err) {
    return handleError(res, err, 'Resend OTP');
  }
};

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
    return handleError(res, err, 'Login');
  }
};

module.exports = {
  register,
  verifyOtp: verifyOtpController,
  resendOtp: resendOtpController,
  login,
};
