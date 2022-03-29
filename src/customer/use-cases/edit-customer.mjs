import { makeCustomer } from "../index.mjs";

export function makeEditCustomer({ customerDb, Id }) {
  return async function editCustomer({ id, ...changes }) {
    if (!(id && Id.validate(id))) {
      throw new Error("You must supply a valid id");
    }

    const exists = await customerDb.findById(id);

    if (!exists) {
      throw new Error("No such customer found");
    }

    const { getName, getPhone, getIsGold } = makeCustomer({
      ...exists,
      ...changes,
    });

    const payload = {
      name: getName(),
      phone: getPhone(),
      isGold: getIsGold(),
    };

    return await customerDb.update(id, payload);
  };
}
