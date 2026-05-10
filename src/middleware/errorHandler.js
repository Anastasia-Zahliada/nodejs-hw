import createHttpError from 'http-errors';

export const errorHandler = (err, _req, res, _next) => {
  const isHttpError = createHttpError.isHttpError(err);
  const status = isHttpError ? err.status : 500;

  res.status(status).json({
    message: err.message,
  });
};
