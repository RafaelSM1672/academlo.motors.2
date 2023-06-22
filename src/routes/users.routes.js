const express = require('express');

//controllers
const userController = require('../controllers/users.controller');

//middlewares
const userMiddleware = require('../middlewares/users.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router.use(authMiddleware.protect);

router.get('/', authMiddleware.restrictTo('admin'), userController.findUsers);

router
  .route('/:id')
  .get(userMiddleware.validUser, userController.findUser)
  .patch(userMiddleware.validUser, userController.updateUser)
  .delete(userMiddleware.validUser, userController.deleteUser);

module.exports = router;
