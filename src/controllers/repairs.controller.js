const Repair = require('../models/repairs.model');

exports.findRepairs = async (req, res) => {
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
};

exports.findRepair = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.createAppointment = async (req, res) => {
  try {
    //1-Obtener información de la req.body
    const { date, userId } = req.body;
    const time = req.requestTime;
    //2. Crear la cita usando el modelo
    const appointment = await Repair.create({
      date,
      userId,
    });

    res.json({
      requestTime: time,
      message: 'The appointment has been created!',
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

exports.cancelAppointment = async (req, res) => {
  try {
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
  } catch (error) {
    return res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};
