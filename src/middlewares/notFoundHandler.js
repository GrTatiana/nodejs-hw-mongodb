import error from 'http-errors';

export const notFoundHandler = (req, res, next) => {
  next(error(404, 'Route not found'));
};
