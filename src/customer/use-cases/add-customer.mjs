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
      throw new Error(
        "This phone no is already in use, review details and try again"
      );
    }

    const customer = await customerDb.insert({
      name: getName(),
      phone: getPhone(),
      isGold: getIsGold(),
    });

    return customer;
  };
}
