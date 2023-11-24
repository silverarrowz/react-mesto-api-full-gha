const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Ошибка на стороне сервера';

  console.error(`Ошибка: ${message}`);
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
