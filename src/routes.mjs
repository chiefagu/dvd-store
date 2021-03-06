import config from "config";
import { genreRouter } from "./genre/genre.router.mjs";
import { movieRouter } from "./movie/movie.router.mjs";
import { userRouter } from "./user/user.router.mjs";
import { customerRouter } from "./customer/customer.router.mjs";

const baseUrl = config.get("baseUrl");

export function routes(app) {
  app.get(`${baseUrl}/health-check`, (req, res) => {
    res.sendStatus(200);
  });

  app.use(`${baseUrl}/user`, userRouter());
  app.use(`${baseUrl}/genre`, genreRouter());
  app.use(`${baseUrl}/movie`, movieRouter());
  app.use(`${baseUrl}/customer`, customerRouter());
}
