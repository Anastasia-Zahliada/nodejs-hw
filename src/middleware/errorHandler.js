import createHttpError from 'http-errors';
import multer from 'multer';

export const errorHandler = (err, _req, res, _next) => {
  const isHttpError = createHttpError.isHttpError(err);
  const status = isHttpError
    ? err.status
    : err instanceof multer.MulterError
      ? 400
      : 500;

  res.status(status).json({
    message: err.message,
  });
};
