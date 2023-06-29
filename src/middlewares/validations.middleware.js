const { body, validationResult } = require('express-validator');

const validFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'error',
      errors: errors.mapped(),
    });
  }

  next();
};

//Users
exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name cannot be empty'),
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Must be a valid email'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must be at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must be at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>-_]/)
    .withMessage('Password must be at least one special character'),
  validFields,
];

exports.loginUserValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/\d/)
    .withMessage('Password must be at least one number')
    .matches(/[A-Z]/)
    .withMessage('Password must be at least one uppercase letter')
    .matches(/[!@#$%^&*(),.?":{}|<>-_]/)
    .withMessage('Password must be at least one special character'),
  validFields,
];

exports.updateUserValidation = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('newPassword')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  validFields,
];

//Repairs
exports.createAppointmentValidation = [
  body('date')
    .notEmpty()
    .withMessage('Date cannot be empty')
    .isDate()
    .withMessage('Invalid date format'),
  body('userId')
    .notEmpty()
    .withMessage('User ID cannot be empty')
    .isNumeric()
    .withMessage('User ID must be number'),
  body('motorsNumber')
    .notEmpty()
    .withMessage('Motors number cannot be empty')
    .isNumeric()
    .withMessage('Motors number must be number'),
  body('description').notEmpty().withMessage('Description cannot be empty'),
  validFields,
];
