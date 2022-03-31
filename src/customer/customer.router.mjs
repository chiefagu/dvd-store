import { Router } from "express";

import { expressCallBack } from "../express-callback/index.mjs";
import {
  deleteCustomer,
  getCustomers,
  postCustomer,
  putCustomer,
} from "./controllers/index.mjs";

export function customerRouter() {
  const router = Router();

  router.post("/", expressCallBack(postCustomer));
  router.get("/", expressCallBack(getCustomers));
  router.put("/:id", expressCallBack(putCustomer));
  router.delete("/:id", expressCallBack(deleteCustomer));

  return router;
}
