const ErrorHandler = require("../utils/errorhandler");
const catchAsynchErrors = require("./catchAsynchErrors");
const jwt = require("jsonwebtoken");
const Users = require("../model/userModel");
exports.isAuthenticatedUser = catchAsynchErrors(async (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
  req.user = await Users.findById(decoded.id);
  next();
});

exports.authorizaRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role : ${req.user.role} is not allowed to access this resouce`,
          403
        )
      );
    }
    next();
  };
};
