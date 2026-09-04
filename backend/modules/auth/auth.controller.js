const { AppError, registerUser, verifyOtp, resendOtp, loginUser } = require('./auth.service');
const User = require('./auth.model');

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
      message: 'Registration successful! Enter the 6-digit code sent to your email or phone.',
      data: user,
    });
  } catch (err) {
    return handleError(res, err, 'Register');
  }
};

const verifyOtpController = async (req, res) => {
  try {
    const { email, phone, otp } = req.body;
    const identifier = email || phone;
    
    const result = await verifyOtp(identifier, otp);

    if (result && result.alreadyVerified) {
      return res.status(200).json({ success: true, message: 'Account is already verified.' });
    }

    return res.status(200).json({ success: true, message: 'Verified successfully.' });
  } catch (err) {
    return handleError(res, err, 'Verify OTP');
  }
};

const resendOtpController = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const identifier = email || phone;
    await resendOtp(identifier);

    return res.status(200).json({ success: true, message: 'A new code has been sent.' });
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

const updateProfile = async (req, res) => {
  try {
    const { email, phone, firstName, lastName, address } = req.body;

    let user = await User.findOne({ 
      where: email ? { email } : { phone } 
    });

    if (user) {
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.address = address || user.address;
      await user.save();
    } else {
      await User.create({
        firstName: firstName || 'Unknown',
        lastName: lastName || 'Unknown',
        email: email || null,
        phone: phone || null,
        address: address || null,
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: { firstName, lastName, address },
    });
  } catch (err) {
    return handleError(res, err, 'Update Profile');
  }
};

module.exports = {
  register,
  verifyOtp: verifyOtpController,
  resendOtp: resendOtpController,
  login,
  updateProfile,
};