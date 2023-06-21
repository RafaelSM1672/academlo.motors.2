const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const AppError = require('../utils/appError');

//routes
const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/users.routes');
const repairRouter = require('./routes/repairs.routes');

const app = express();

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

//rutas
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/repairs', repairRouter);
app.use('/api/v1/users', userRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Cant find ${req.originalUrl} on this server! 😢`, 404)
  );
});

module.exports = app;
