export function makeCustomerDb({ customerModel }) {
  return Object.freeze({
    findById,
    findByName,
    insert,
    update,
    remove,
  });

  async function findById(id) {
    return await customerModel.findById(id);
  }

  async function findByName(name) {
    return await customerModel.findOne({ name });
  }

  async function insert(payload) {
    return await customerModel.create(payload);
  }

  async function update(id, payload) {
    return await customerModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );
  }

  async function remove(id) {
    return await customerModel.findByIdAndRemove(id);
  }
}
