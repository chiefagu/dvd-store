export function makeErrorHandler(logger) {
  return function errorHandler(err, req, res) {
    logger.warn(err.message, err);
    return res.send("something went wrong");
  };
}
