const Repair = require('../models/repairs.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validRepair = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
    include: [
      {
        model: User,
      },
    ],
  });

  if (!repair) {
    return next(new AppError(`Repair with id: ${id} not found`, 404));
  }

  req.user = repair.user;
  req.post = repair;
  next();
});
