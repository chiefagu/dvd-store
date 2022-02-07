export function makeUserDb({ userModel }) {
  return Object.freeze({
    findById,
    findByEmail,
    insert,
    remove,
  });

  async function findById(id) {
    return await userModel.findById(id);
  }

  async function findByEmail(email) {
    return await userModel.findOne({ email });
  }

  async function insert(payload) {
    return await userModel.create(payload);
  }

  async function remove(id) {
    return await userModel.findByIdAndRemove(id);
  }
}
