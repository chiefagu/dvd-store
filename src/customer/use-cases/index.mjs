import { makeAddCustomer } from "./add-customer.mjs";
import { makeListCustomers } from "./list-customers.mjs";

import { customerDb } from "../data-access/index.mjs";

export const addCustomer = makeAddCustomer({ customerDb });
export const listCustomers = makeListCustomers({ customerDb });
