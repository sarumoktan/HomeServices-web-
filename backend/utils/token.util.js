const jwt = require('jsonwebtoken');

const generateToken = (payload) => {
    // Wrap primitive payload (number/string) into an object if necessary
    const safePayload = (typeof payload === 'object' && payload !== null) 
        ? payload 
        : { id: payload };

    return jwt.sign(safePayload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateToken,
    verifyToken
};
