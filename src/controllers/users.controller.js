const User = require('../models/users.model');
const catchAsync = require('../utils/catchAsync');

exports.findUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
  });

  return res.json({
    results: users.length,
    status: 'success',
    message: 'Users find',
    users,
  });
});

exports.findUser = catchAsync(async (req, res) => {
  const { user } = req;

  res.json({
    status: 'success',
    message: `User #${user.id} found`,
    user,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req;

  const { name, email } = req.body;

  await user.update({ name, email });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been updated',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;

  await user.update({ status: 'disabled' });

  return res.status(200).json({
    status: 'success',
    message: 'The user has been disabled',
  });
});
