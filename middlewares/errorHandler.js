// Not found

const notFound = (req, res, next) => {
  const error = new Error(`Não encontrado ${req.originalUrl}`);
  res.status(200);
  next(error);
};

// Error Handler

const errorHandler = (err, req, res, next) => {
  const statuscode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statuscode);
  res.json({
    message: err?.message,
    stack: err?.stack,
  });
};

module.exports = { notFound, errorHandler };
