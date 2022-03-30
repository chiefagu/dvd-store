import { makeAddCustomer } from "./add-customer.mjs";
import { makeListCustomers } from "./list-customers.mjs";
import { makeEditCustomer } from "./edit-customer.mjs";
import { makeRemoveCustomer } from "./remove-customer.mjs";

import { customerDb } from "../data-access/index.mjs";

import { Id } from "../../utils/Id.mjs";

export const addCustomer = makeAddCustomer({ customerDb });
export const listCustomers = makeListCustomers({ customerDb });
export const editCustomer = makeEditCustomer({ customerDb, Id });
export const removeCustomer = makeRemoveCustomer({ customerDb, Id });
