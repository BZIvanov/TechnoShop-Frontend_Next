const status = require('http-status');
const admin = require('../firebase');
const User = require('../models/user');
const { USER_ROLES } = require('../constants');
const messages = require('../constants/messages');

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseUser;

    next();
  } catch (error) {
    res.status(status.UNAUTHORIZED).json({
      message: messages.invalidToken,
      error,
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;

  const adminUser = await User.findOne({ email }).exec();

  if (adminUser.role !== USER_ROLES.ADMIN) {
    return res.status(status.FORBIDDEN).json({
      message: messages.accessDenied,
    });
  }

  next();
};
