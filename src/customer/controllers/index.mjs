import { makePostCustomer } from "./post-customer.mjs";
import { makeGetCustomers } from "./get-customers.mjs";

import { addCustomer, listCustomers } from "../use-cases/index.mjs";
import { logger } from "../../logger/index.mjs";

export const postCustomer = makePostCustomer({ addCustomer, logger });
export const getCustomers = makeGetCustomers({ listCustomers, logger });
