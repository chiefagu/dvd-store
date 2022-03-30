import { makePostCustomer } from "./post-customer.mjs";
import { makeGetCustomers } from "./get-customers.mjs";
import { makePutCustomer } from "./put-customer.mjs";
import { makeDeleteCustomer } from "./delete-customer.mjs";

import {
  addCustomer,
  listCustomers,
  editCustomer,
  removeCustomer,
} from "../use-cases/index.mjs";

import { logger } from "../../logger/index.mjs";

export const postCustomer = makePostCustomer({ addCustomer, logger });
export const getCustomers = makeGetCustomers({ listCustomers, logger });
export const putCustomer = makePutCustomer({ editCustomer, logger });
export const deleteCustomer = makeDeleteCustomer({ removeCustomer, logger });
