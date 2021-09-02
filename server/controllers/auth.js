const User = require('../models/user');

exports.createOrUpdateUser = async (req, res) => {
  const { picture, email } = req.user;

  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split('@')[0], picture },
    { new: true }
  );

  if (user) {
    return res.json(user);
  }

  const newUser = await new User({
    email,
    name: email.split('@')[0],
    picture,
  }).save();

  res.json(newUser);
};

exports.currentUser = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
