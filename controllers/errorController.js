const AppError = require('../utils/appError');

const handleCastErrorDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const handleDuplicateFieldsDB = (err) => {
  // const value = err.message.slice(
  //   err.message.indexOf('"'),
  //   err.message.lastIndexOf('"') + 1
  // );
  const value = err.message.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
  return new AppError(
    `Duplicate field value: ${value}. please use another value!`,
    400
  );
};

const handleValidationErrorDB = (err) => {
  const message = Object.values(err.errors)
    .map((error) => error.message)
    .join('. ');
  return new AppError(`Invalid input data. ${message}.`, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. Please log in again.', 401);
const handleJWTExpiredError = () =>
  new AppError('Your token has expired. Please log in again.', 401);

const sendErrorDev = (res, req, err) => {
  if (req.originalUrl.startsWith('/api'))
    return res.status(err.statusCode).json({
      status: err.status,
      err,
      message: err.message,
      stack: err.stack,
    });

  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    message: err.message,
  });
};

const sendErrorProd = (res, req, err) => {
  if (req.originalUrl.startsWith('/api')) {
    if (err.isOperational)
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });

    console.error('Error 🔥', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  }

  if (err.isOperational)
    return res.status(err.statusCode).render('error', {
      title: 'Something went wrong!',
      message: err.message,
    });

  console.error('Error 🔥', err);
  res.status(err.statusCode).render('error', {
    title: 'Something went wrong!',
    message: 'Please try again later.',
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';
  if (process.env.NODE_ENV === 'development') sendErrorDev(res, req, err);
  else {
    let error = { ...err, name: err.name, message: err.message };
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorProd(res, req, error);
  }
};
