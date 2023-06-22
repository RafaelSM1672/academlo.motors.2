const express = require('express');

//controllers
const repairController = require('../controllers/repairs.controller');

//middlewares
const validationMiddleware = require('../middlewares/validations.middleware');
const repairMiddleware = require('../middlewares/repairs.middleware');

const router = express.Router();

router
  .route('/')
  .get(repairController.findRepairs)
  .post(
    validationMiddleware.createAppointmentValidation,
    repairController.createAppointment
  );

router
  .route('/:id')
  .get(repairMiddleware.validRepair, repairController.findRepair)
  .patch(repairMiddleware.validRepair, repairController.updateStatus)
  .delete(repairMiddleware.validRepair, repairController.cancelAppointment);

module.exports = router;
