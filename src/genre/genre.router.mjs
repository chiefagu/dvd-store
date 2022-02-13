import express from "express";

import { expressCallBack } from "../express-callback/index.mjs";
import { deserializeUser } from "../middleware/index.mjs";
import {
  deleteGenre,
  getGenres,
  postGenre,
  putGenre,
} from "./controller/index.mjs";

export function genreRouter() {
  const router = express.Router();

  router.post("/", deserializeUser, expressCallBack(postGenre));
  router.get("/", expressCallBack(getGenres));
  router.put("/:id", deserializeUser, expressCallBack(putGenre));
  router.delete("/:id", deserializeUser, expressCallBack(deleteGenre));

  return router;
}
