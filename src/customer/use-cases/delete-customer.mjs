export function makeDeleteCustomer({ customerDb, Id }) {
  return async function deleteCustomer(id) {
    if (!(id && Id.validate(id))) {
      throw new Error("You must provide a valid id");
    }

    const deleted = await customerDb.findByIdAndRemove(id);

    if (!deleted) {
      throw new Error("No data found");
    }

    return deleted;
  };
}
