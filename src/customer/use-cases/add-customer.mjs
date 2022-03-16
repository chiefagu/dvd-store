import { makeCustomer } from "../index.mjs";

export function makeAddCustomer({ customerDb }) {
  return async function addCustomer({ name, phone, isGold }) {
    const { getName, getPhone, getIsGold } = makeCustomer({
      name,
      phone,
      isGold,
    });

    const exists = await customerDb.findByPhone(getPhone());

    if (exists) {
      return exists;
    }

    const customer = await customerDb.create({
      name: getName(),
      phone: getPhone(),
      isGold: getIsGold(),
    });

    return customer;
  };
}
