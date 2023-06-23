const express = require('express');

//controllers
const userController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

//middlewares
const validationMiddleware = require('../middlewares/validations.middleware');
const userMiddleware = require('../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.post(
  '/signup',
  validationMiddleware.createUserValidation,
  authController.signup
);

router.post(
  '/login',
  validationMiddleware.loginUserValidation,
  authController.login
);

router.use(authMiddleware.protect);

router.get('/renew', authController.renew);

router.get('/', userController.findUsers);

router
  .route('/:id')
  .get(userMiddleware.validUser, userController.findUser)
  .patch(userMiddleware.validUser, userController.updateUser)
  .delete(userMiddleware.validUser, userController.deleteUser);

router.patch(
  '/password/:id',
  validationMiddleware.updateUserValidation,
  userMiddleware.validUser,
  authMiddleware.protectAccountOwner,
  authController.updatePassword
);

module.exports = router;
