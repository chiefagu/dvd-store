export function makeGenreDb({ genreModel }) {
  return Object.freeze({
    findAll,
    findById,
    insert,
    remove,
  });

  async function findAll() {
    return await genreModel.find();
  }

  async function findById(id) {
    return await genreModel.findById(id);
  }

  async function insert(payload) {
    return await genreModel.create(payload);
  }

  async function remove(id) {
    return await genreModel.findByIdAndRemove(id);
  }
}
