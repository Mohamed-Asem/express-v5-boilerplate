import AppError from './../utils/AppError.js';

const sendErrorInDevelopment = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorInProduction = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('Error happened 😜', err);
    res.status(500).json({
      status: 'error',
      message: 'Something wrong happened',
    });
  }
};

const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  const env = process.env.NODE_ENV || 'development';

  if (err.name === 'CastError') {
    err = new AppError(400, `Invalid ${err.path} : ${err.value}`);
  }

  if (err.code === 11000) {
    err = new AppError(
      400,
      `Duplicate field ${Object.keys(err.keyValue)[0]} with the value ${
        err.keyValue[Object.keys(err.keyValue)[0]]
      }`
    );
  }

  if (err.name === 'ValidationError') {
    let errors = Object.values(err.errors)
      .map(el => el.message)
      .join('. ');

    err = new AppError(400, `Invalid input data : ${errors}`);
  }

  if (err.name === 'TokenExpiredError') {
    err = new AppError(401, 'Token has been expired .. pls login again');
  }

  if (err.name === 'JsonWebTokenError') {
    err = new AppError(401, 'Invalid token pls login again!');
  }

  if (env === 'development') {
    sendErrorInDevelopment(err, res);
  } else if (env === 'production') {
    sendErrorInProduction(err, res);
  }
};

export default globalErrorHandler;
