import { makeMovieDb } from "./movie-db.mjs";
import { movieModel } from "./index.mjs";

describe("movie db", () => {
  it("finds a movie by a given id", async () => {
    const movieDb = makeMovieDb(movieModel);

    const movie = { id: 1, title: "a movie title" };

    jest.spyOn(movieModel, "findById").mockResolvedValue(movie);

    const found = await movieDb.findById(movie.id);

    expect(movieModel.findById).toHaveBeenCalledWith(movie.id);
    expect(movieModel.findById).toHaveBeenCalledTimes(1);

    expect(found).toEqual(movie);
  });

  it("finds all movies", async () => {
    const movieDb = makeMovieDb(movieModel);

    const movies = [
      { id: 1, title: "first" },
      { id: 2, title: "second" },
    ];

    jest.spyOn(movieModel, "find").mockResolvedValue(movies);

    const found = await movieDb.findAll();

    expect(movieModel.find).toHaveBeenCalledTimes(1);
    expect(movieModel.find).toHaveBeenCalledWith(/** nothing */);

    expect(found).toEqual(movies);
  });

  it("saves a movie to the db", async () => {
    const movieDb = makeMovieDb(movieModel);

    const movie = { id: 1, title: "first" };

    jest.spyOn(movieModel, "create").mockResolvedValue(movie);

    const found = await movieDb.insert(movie);

    expect(movieModel.create).toHaveBeenCalledTimes(1);
    expect(movieModel.create).toHaveBeenCalledWith(movie);

    expect(found).toEqual(movie);
  });

  it("updates a specific movie with a given id", async () => {
    const movieDb = makeMovieDb(movieModel);

    const movie = { id: 1, title: "first" };

    jest.spyOn(movieModel, "findByIdAndUpdate").mockResolvedValue(movie);

    const found = await movieDb.update(movie.id, movie);

    expect(movieModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);
    expect(movieModel.findByIdAndUpdate).toHaveBeenCalledWith(
      movie.id,
      { $set: movie },
      { new: true }
    );

    expect(found).toEqual(movie);
  });

  it("deletes a specific movie with a given id", async () => {
    const movieDb = makeMovieDb(movieModel);

    const movie = { id: 1, title: "first" };

    jest.spyOn(movieModel, "findByIdAndRemove").mockResolvedValue(movie);

    const found = await movieDb.remove(movie.id);

    expect(movieModel.findByIdAndRemove).toHaveBeenCalledTimes(1);
    expect(movieModel.findByIdAndRemove).toHaveBeenCalledWith(movie.id);

    expect(found).toEqual(movie);
  });
});
