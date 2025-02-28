import createHttpError, { HttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  error =
    error.name === 'CastError'
      ? createHttpError(404, 'Contact not found')
      : error;

  error =
    error.name === 'ValidationError'
      ? createHttpError(400, "Contact couldn't create!")
      : error;
  if (error instanceof HttpError) {
    res.status(error.status).json({
      status: error.status,
      message: error.name,
      data: error,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: error,
  });
};
