import { makeMovie } from "../index.mjs";

export function makeEditMovie({ movieDb, genreDb, Id }) {
  return async function editMovie({ id, genreId, ...changes }) {
    if (!(id && Id.validate(id))) {
      throw new Error("you must supply a valid id");
    }

    const exists = await movieDb.findById(id);
    if (!exists) throw new Error("no such movie exists");

    const { getTitle, getDailyRentalRate, getNumberInStock, getGenreId } =
      makeMovie({ id, genreId, ...changes });

    const genre = await genreDb.findById(getGenreId());

    if (!genre) {
      throw new Error("no such genre exists");
    }

    const movie = await movieDb.update({
      title: getTitle(),
      genre: { _id: genre._id, name: genre.name },
      dailyRentalRate: getDailyRentalRate(),
      numberInStock: getNumberInStock(),
    });

    return movie;
  };
}
