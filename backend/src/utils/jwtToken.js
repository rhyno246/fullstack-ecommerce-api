const jwt = require("jsonwebtoken");
const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.EXPIRES }
  );
  res.status(statusCode).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
