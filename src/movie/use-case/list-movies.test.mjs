import { makeListMovies } from "./list-movies.mjs";
import { movieDb } from "../data-access/index.mjs";

describe("list movies", () => {
  let listMovies;
  beforeAll(() => {
    listMovies = makeListMovies({ movieDb });
  });
  describe("successfully fetches movies data", () => {
    it("returns a list of movies", async () => {
      const movies = [
        {
          title: "a title",
          dailyRentalRate: 10,
          numberInStock: 100,
          genre: { _id: "1", name: "Thriller" },
        },
      ];

      jest.spyOn(movieDb, "findAll").mockResolvedValue(movies);
      try {
        const actual = await listMovies();

        expect(movieDb.findAll).toHaveBeenCalledWith(/** nothing */);
        expect(movieDb.findAll).toHaveBeenCalledTimes(1);

        expect(actual).toEqual(expect.arrayContaining(movies));
      } catch (error) {
        expect(error.message).toBeNull();
      }
    });
  });

  describe("failed to get movies", () => {
    it("throws an error", async () => {
      const error = new Error("cry");

      jest.spyOn(movieDb, "findAll").mockRejectedValue(error);
      try {
        await listMovies();
      } catch (error) {
        expect(movieDb.findAll).toHaveBeenCalledWith(/** nothing */);
        expect(movieDb.findAll).toHaveBeenCalledTimes(1);

        expect(error.message).toMatchInlineSnapshot(`"cry"`);
      }
    });
  });
});
