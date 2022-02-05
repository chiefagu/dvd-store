export function makeNotFoundHandler(logger) {
  return function notFoundHandler(req, res) {
    logger.warn(`Could not ${req.method} ${req.url}`);
    res.status(404).send(`Could not ${req.method} ${req.url}`);
  };
}
