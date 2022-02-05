import config from "config";

const baseUrl = config.get("baseUrl");

export function routes(app) {
  app.get(`${baseUrl}/health-check`, (req, res) => {
    res.sendStatus(200);
  });
}
