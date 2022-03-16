export function makeCustomerDb({ customerModel }) {
  return Object.freeze({
    findById,
    findByPhone,
    insert,
    update,
    remove,
  });

  async function findById(id) {
    return await customerModel.findById(id);
  }

  async function findByPhone(phone) {
    return await customerModel.findOne({ phone });
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
