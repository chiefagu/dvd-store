import express from "express";

import { expressCallBack } from "../express-callback/index.mjs";
import { postMovie } from "./controllers/index.mjs";

export function movieRouter() {
  const router = express.Router();

  router.post("/", expressCallBack(postMovie));

  return router;
}
