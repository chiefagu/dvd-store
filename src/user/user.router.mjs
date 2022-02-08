import { Router } from "express";
import { expressCallBack } from "../express-callback/index.mjs";
import { postUser } from "./controller/index.mjs";

export function userRouter() {
  const router = Router();

  router.post("/", expressCallBack(postUser));

  return router;
}
