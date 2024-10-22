const errorHandler = (err, req, res, next) => {
  // Set default status code to 500 (Internal Server Error)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  res.json({
    message: err.message,
    // Include stack trace only in development mode for easier debugging
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
