const express = require('express');

//controllers
const repairController = require('../controllers/repairs.controller');

//middlewares
const validationMiddleware = require('../middlewares/validations.middleware');
const repairMiddleware = require('../middlewares/repairs.middleware');
const authMiddleware = require('./../middlewares/auth.middleware');

const router = express.Router();

router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), repairController.findRepairs)
  .post(
    validationMiddleware.createAppointmentValidation,
    authMiddleware.protect,
    repairController.createAppointment
  );

router
  .route('/:id')
  .get(
    authMiddleware.restrictTo('employee'),
    repairMiddleware.validRepair,
    repairController.findRepair
  )
  .patch(
    authMiddleware.restrictTo('employee'),
    repairMiddleware.validRepair,
    repairController.updateStatus
  )
  .delete(
    authMiddleware.restrictTo('employee'),
    repairMiddleware.validRepair,
    repairController.cancelAppointment
  );

module.exports = router;
