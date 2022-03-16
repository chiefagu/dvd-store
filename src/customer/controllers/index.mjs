import { makePostCustomer } from "./post-customer.mjs";

import { addCustomer } from "../use-cases/index.mjs";
import { logger } from "../../logger/index.mjs";

export const postCustomer = makePostCustomer({ addCustomer, logger });
