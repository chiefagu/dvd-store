import { Router } from "express";

import { expressCallBack } from "../express-callback/index.mjs";
import { postCustomer } from "./controllers/index.mjs";

export function customerRouter() {
  const router = Router();

  router.post("/", expressCallBack(postCustomer));

  return router;
}
