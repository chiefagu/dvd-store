export function expressCallBack(controller) {
  return function (req, res, next) {
    const httpRequest = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: {
        "Content-Type": req.get("Content-Type"),
        "User-Agent": req.get("User-Agent"),
        Referer: req.get("referer"),
      },
    };

    controller(httpRequest)
      .then((httpResponse) => {
        if (httpResponse.headers) {
          res.set(httpResponse.headers);
        }

        res.status(httpResponse.statusCode).send(httpResponse.body);
      })
      .catch((err) => {
        next(err);
      });
  };
}
