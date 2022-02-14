export function makeMovieDb(movieModel) {
  return {
    findById,
    findAll,
    insert,
    update,
    remove,
  };

  async function findById(id) {
    return await movieModel.findById(id);
  }

  async function findAll() {
    return await movieModel.find();
  }

  async function insert(payload) {
    return await movieModel.create(payload);
  }

  async function update(id, payload) {
    return await movieModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );
  }

  async function remove(id) {
    return await movieModel.findByIdAndRemove(id);
  }
}
