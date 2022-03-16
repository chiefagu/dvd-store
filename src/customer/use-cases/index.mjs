import { makeAddCustomer } from "./add-customer.mjs";

import { customerDb } from "../data-access/index.mjs";

export const addCustomer = makeAddCustomer({ customerDb });
