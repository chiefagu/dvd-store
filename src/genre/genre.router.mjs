import express from "express";
import { expressCallBack } from "../express-callback/index.mjs";
import { getGenres, postGenre } from "./controller/index.mjs";

export function genreRouter() {
  const router = express.Router();

  router.post("/", expressCallBack(postGenre));
  router.get("/", expressCallBack(getGenres));

  return router;
}
