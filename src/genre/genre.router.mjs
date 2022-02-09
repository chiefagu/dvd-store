import express from "express";
import { expressCallBack } from "../express-callback/index.mjs";
import { postGenre } from "./controller/index.mjs";

export function genreRouter() {
  const router = express.Router();

  router.post("/", expressCallBack(postGenre));

  return router;
}
