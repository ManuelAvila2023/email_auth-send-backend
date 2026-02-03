export const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    const errObj = {};
    err.errors.map(er => {
      errObj[er.path] = er.message;
    });
    return res.status(400).json(errObj);
  }
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({
      message: err.message,
      error: err.parent.detail
    });
  }
  if (err.name === 'SequelizeDatabaseError') {
    return res.status(400).json({
      message: err.message
    });
  }
  return res.status(500).json({
    message: err.message,
    error: err
  });
};