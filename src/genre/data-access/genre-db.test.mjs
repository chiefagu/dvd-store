import { buildFakeGenre } from "../../../__tests__/fixtures/genre.mjs";
import { makeGenreDb } from "./genre-db.mjs";
import { genreModel } from "./index.mjs";

describe("genreDb", () => {
  let genreDb;
  beforeAll(() => {
    genreDb = makeGenreDb({ genreModel });
  });

  it("finds all genres", async () => {
    const genres = [buildFakeGenre(), buildFakeGenre({ name: "Action" })];

    jest.spyOn(genreModel, "find").mockResolvedValueOnce(genres);

    const actual = await genreDb.findAll();

    expect(genreModel.find).toHaveBeenCalledWith(/**nothing */);
    expect(genreModel.find).toHaveBeenCalledTimes(1);

    expect(actual).toEqual(genres);
  });

  it("finds a genre with a given id", async () => {
    const genre = buildFakeGenre();

    jest.spyOn(genreModel, "findById").mockResolvedValueOnce(genre);

    const actual = await genreDb.findById(genre._id);

    expect(genreModel.findById).toHaveBeenCalledWith(genre._id);
    expect(genreModel.findById).toHaveBeenCalledTimes(1);

    expect(actual).toEqual(genre);
  });

  it("saves the genre", async () => {
    const genre = buildFakeGenre();

    jest.spyOn(genreModel, "create").mockResolvedValueOnce(genre);

    const actual = await genreDb.insert(genre);

    expect(genreModel.create).toHaveBeenCalledWith(genre);
    expect(genreModel.create).toHaveBeenCalledTimes(1);

    expect(actual).toEqual(genre);
  });

  it("deletes the genre", async () => {
    const genre = buildFakeGenre();

    jest.spyOn(genreModel, "findByIdAndRemove").mockResolvedValueOnce(genre);

    const actual = await genreDb.remove(genre._id);

    expect(genreModel.findByIdAndRemove).toHaveBeenCalledWith(genre._id);
    expect(genreModel.findByIdAndRemove).toHaveBeenCalledTimes(1);

    expect(actual).toEqual(genre);
  });
});
