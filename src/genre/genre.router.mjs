import express from "express";
import { expressCallBack } from "../express-callback/index.mjs";
import {
  deleteGenre,
  getGenres,
  postGenre,
  putGenre,
} from "./controller/index.mjs";

export function genreRouter() {
  const router = express.Router();

  router.post("/", expressCallBack(postGenre));
  router.get("/", expressCallBack(getGenres));
  router.put("/:id", expressCallBack(putGenre));
  router.delete("/:id", expressCallBack(deleteGenre));

  return router;
}
