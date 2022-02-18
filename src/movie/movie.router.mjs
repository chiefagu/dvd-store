import express from "express";

import { expressCallBack } from "../express-callback/index.mjs";
import { getMovies, postMovie, putMovie } from "./controllers/index.mjs";

export function movieRouter() {
  const router = express.Router();

  router.post("/", expressCallBack(postMovie));
  router.get("/", expressCallBack(getMovies));
  router.put("/:id", expressCallBack(putMovie));

  return router;
}
