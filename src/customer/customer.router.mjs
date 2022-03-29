import { Router } from "express";

import { expressCallBack } from "../express-callback/index.mjs";
import {
  getCustomers,
  postCustomer,
  putCustomer,
} from "./controllers/index.mjs";

export function customerRouter() {
  const router = Router();

  router.post("/", expressCallBack(postCustomer));
  router.get("/", expressCallBack(getCustomers));
  router.put("/:id", expressCallBack(putCustomer));

  return router;
}
