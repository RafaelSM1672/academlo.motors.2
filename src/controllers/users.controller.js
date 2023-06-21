const User = require('../models/users.model');

exports.findUsers = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { user } = req;

    res.json({
      status: 'success',
      message: `User #${user.id} found`,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { user } = req;

    const { name, email } = req.body;

    await user.update({ name, email });

    return res.status(200).json({
      status: 'success',
      message: 'The user has been updated',
      user,
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { user } = req;

    await user.update({ status: 'disabled' });

    return res.status(200).json({
      status: 'success',
      message: 'The user has been disabled',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
