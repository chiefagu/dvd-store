export function makeErrorHandler(logger) {
  return function errorHandler(err, req, res) {
    logger.warn(err.message, err);
    return res.status(500).send("something went wrong");
  };
}
