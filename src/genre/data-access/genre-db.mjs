export function makeGenreDb({ genreModel }) {
  return Object.freeze({
    findAll,
    findById,
    findByName,
    insert,
    update,
    remove,
  });

  async function findAll() {
    return await genreModel.find();
  }

  async function findById(id) {
    return await genreModel.findById(id);
  }

  async function findByName(name) {
    return await genreModel.findOne({ name });
  }

  async function insert(payload) {
    return await genreModel.create(payload);
  }

  async function update(id, payload) {
    return await genreModel.findByIdAndUpdate(
      id,
      { $set: payload },
      { new: true }
    );
  }

  async function remove(id) {
    return await genreModel.findByIdAndRemove(id);
  }
}
