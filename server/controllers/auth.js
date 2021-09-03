const status = require('http-status');
const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { picture, email } = req.user;

  const username = email.split('@')[0];
  const user = await User.findOneAndUpdate(
    { email },
    { name: username, picture },
    { new: true }
  );

  if (user) {
    return res.status(status.OK).json(user);
  }

  const newUser = await new User({
    email,
    name: username,
    picture,
  }).save();

  res.status(status.CREATED).json(newUser);
};

exports.currentUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    res.status(status.OK).json(user);
  } catch (error) {
    console.log(error);
  }
};
