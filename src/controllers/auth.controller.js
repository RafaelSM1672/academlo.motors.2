const User = require('../models/users.model');

exports.signup = async (req, res) => {
  try {
    const { id, name, email, password, role, status } = req.body;

    const user = await User.create({
      id,
      name,
      email,
      password,
      role,
      status,
    });

    res.status(200).json({
      status: 'success',
      message: 'The user has been created!',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 😢',
    });
  }
};

exports.login = async (req, res) => {
  try {
    res.status(200).json({
      status: 'success',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong! 😢',
    });
  }
};
