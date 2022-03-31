export function makeRemoveCustomer({ customerDb, Id }) {
  return async function removeCustomer(id) {
    if (!(id && Id.validate(id))) {
      throw new Error("You must provide a valid id");
    }

    const deleted = await customerDb.remove(id);

    if (!deleted) {
      throw new Error("No data found");
    }

    return deleted;
  };
}
