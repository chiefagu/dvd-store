import { buildFakeGenre } from "../../../__tests__/fixtures/genre.mjs";
import { makeListGenres } from "./list-genres.mjs";

describe("list genres", () => {
  let listGenres;
  const genreDb = { findAll: jest.fn() };
  beforeAll(() => {
    listGenres = makeListGenres({ genreDb });
  });

  it("returns all genres", async () => {
    const genres = [
      buildFakeGenre(),
      buildFakeGenre({ name: "Action" }),
      buildFakeGenre({ name: "Horror" }),
    ];

    genreDb.findAll.mockResolvedValueOnce(genres);

    const actual = await listGenres();

    expect(genreDb.findAll).toHaveBeenCalledWith(/** nothing */);
    expect(genreDb.findAll).toHaveBeenCalledTimes(1);

    expect(actual).toEqual(expect.arrayContaining(genres));
  });
});
