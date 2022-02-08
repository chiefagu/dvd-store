import config from "config";
import { userRouter } from "./user/user.router.mjs";

const baseUrl = config.get("baseUrl");

export function routes(app) {
  app.get(`${baseUrl}/health-check`, (req, res) => {
    res.sendStatus(200);
  });

  app.use(`${baseUrl}/user`, userRouter());
}
