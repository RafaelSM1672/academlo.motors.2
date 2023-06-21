const express = require('express');

//controllers
const userController = require('../controllers/users.controller');

//middlewares
const userMiddleware = require('../middlewares/users.middleware');

const router = express.Router();

router.route('/').get(userController.findUsers);

router
  .route('/:id')
  .get(userMiddleware.validUser, userController.findUser)
  .patch(userMiddleware.validUser, userController.updateUser)
  .delete(userMiddleware.validUser, userController.deleteUser);

module.exports = router;
