import { Id } from "../../utils/Id.mjs";
import { makePutGenre } from "./put-genre.mjs";

describe("put-genre controller", () => {
  let putGenre;

  const logger = { warn: jest.fn() };
  const editGenre = jest.fn();
  beforeAll(() => {
    putGenre = makePutGenre({ editGenre, logger });
  });

  describe("successfully puts a genre", () => {
    it("returns the edited genre", async () => {
      const genre = { id: Id.makeId(), name: "Action" };
      const headers = { "Content-Type": "application/json" };

      const request = {
        body: { name: genre.name },
        params: { id: genre.id },
      };

      editGenre.mockResolvedValue(genre);

      const actual = await putGenre(request);

      expect(editGenre).toHaveBeenCalledWith({
        id: genre.id,
        name: genre.name,
      });

      expect(editGenre).toHaveBeenCalledTimes(1);

      expect(actual).toEqual({
        headers,
        statusCode: 201,
        body: genre,
      });
    });
  });

  describe("failed to put a genre", () => {
    it("returns an error and statusCode", async () => {
      const genre = { id: Id.makeId(), name: "Action" };
      const headers = { "Content-Type": "application/json" };

      const request = {
        body: { name: genre.name },
        params: { id: genre.id },
      };

      const error = new Error("0-0");

      editGenre.mockRejectedValue(error);

      const actual = await putGenre(request);

      expect(editGenre).toHaveBeenCalledWith({
        id: genre.id,
        name: genre.name,
      });

      expect(editGenre).toHaveBeenCalledTimes(1);

      expect(logger.warn).toHaveBeenCalledWith(error.message, error);
      expect(logger.warn).toHaveBeenCalledTimes(1);

      expect(actual).toEqual({
        headers,
        statusCode: 400,
        body: error.message,
      });
    });
  });
});
