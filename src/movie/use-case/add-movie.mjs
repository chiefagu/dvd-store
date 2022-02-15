import { makeMovie } from "../index.mjs";

export function makeAddMovie({ Id, movieDb, genreDb }) {
  return async function addMovie({ genreId, ...movieInputs }) {
    if (!(genreId && Id.validate(genreId))) {
      throw new Error("you must supply a valid genreId");
    }

    const genre = await genreDb.findById(genreId);

    if (!genre) {
      throw new Error("no genre found");
    }

    const { getTitle, getDailyRentalRate, getNumberInStock } = makeMovie({
      genreId,
      ...movieInputs,
    });

    const movie = await movieDb.insert({
      title: getTitle(),
      dailyRentalRate: getDailyRentalRate(),
      numberInStock: getNumberInStock(),
      genre: { _id: genre._id, name: genre.name },
    });

    return movie;
  };
}
