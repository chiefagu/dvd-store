import express from "express";
import cors from "cors";

import { routes } from "./routes.mjs";
import { errorHandler, notFoundHandler } from "./middleware/index.mjs";

export function buildApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  routes(app);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
