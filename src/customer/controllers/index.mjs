import { makePostCustomer } from "./post-customer.mjs";
import { makeGetCustomers } from "./get-customers.mjs";

import {
  addCustomer,
  listCustomers,
  editCustomer,
} from "../use-cases/index.mjs";
import { logger } from "../../logger/index.mjs";
import { makePutCustomer } from "./put-customer.mjs";

export const postCustomer = makePostCustomer({ addCustomer, logger });
export const getCustomers = makeGetCustomers({ listCustomers, logger });
export const putCustomer = makePutCustomer({ editCustomer, logger });
