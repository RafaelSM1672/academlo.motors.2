const repairController = require('../controllers/repairs.controller');
const express = require('express');

const router = express.Router();

router
  .route('/')
  .get(repairController.findRepairs)
  .post(repairController.createAppointment);

router
  .route('/:id')
  .get(repairController.findRepair)
  .patch(repairController.updateStatus)
  .delete(repairController.cancelAppointment);

module.exports = router;
