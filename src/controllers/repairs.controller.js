const Repair = require('../models/repairs.model');
const catchAsync = require('../utils/catchAsync');

exports.findRepairs = catchAsync(async (req, res) => {
  const time = req.requestTime;

  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });

  res.json({
    requestTime: time,
    results: repairs.length,
    message: 'Repairs find',
    repairs,
  });
});

exports.findRepair = catchAsync(async (req, res) => {
  const time = req.requestTime;
  const { id } = req.params;
  const { status } = req.body;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `The repair whith id: ${id} not found!`,
    });
  }

  res.json({
    requestTime: time,
    message: `Repair #${id} found`,
    repair,
    status,
  });
});

exports.createAppointment = catchAsync(async (req, res) => {
  //1-Obtener información de la req.body
  const { date, userId } = req.body;
  const time = req.requestTime;
  //2. Crear la cita usando el modelo
  const appointment = await Repair.create({
    date,
    userId,
    motorsNumber,
    description,
  });

  res.json({
    requestTime: time,
    message: 'The appointment has been created!',
    appointment,
  });
});

exports.updateStatus = catchAsync(async (req, res) => {
  const time = req.requestTime;
  const { id } = req.params;
  const { status } = req.body;

  const repair = await Repair.findOne({
    where: {
      id,
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `Repair with id: ${id} not found`,
    });
  }

  await repair.update({ status: 'completed' });

  return res.status(200).json({
    requestTime: time,
    message: 'The repair has been updated',
    repair,
  });
});

exports.cancelAppointment = catchAsync(async (req, res) => {
  const time = req.requestTime;
  const { id } = req.params;
  const { status } = req.body;

  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
  });

  if (!repair) {
    return res.status(404).json({
      status: 'error',
      message: `Repair with id: ${id} not found`,
    });
  }

  await repair.update({ status: 'cancelled' });

  return res.status(200).json({
    requestTime: time,
    repair,
    message: 'The repair has been cancelled',
  });
});
