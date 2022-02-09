import { Id } from "../../utils/Id.mjs";
import { makeDeleteGenre } from "./delete-genre.mjs";

describe("delete-genre controller", () => {
  const removeGenre = jest.fn();
  const logger = { warn: jest.fn() };
  const headers = { "Content-Type": "application/json" };

  let deleteGenre;
  beforeAll(() => {
    deleteGenre = makeDeleteGenre({ removeGenre, logger });
  });

  it("successfully deletes a genre", async () => {
    const genre = { id: Id.makeId(), name: "Drama" };

    const request = {
      params: {
        id: genre.id,
      },
    };

    removeGenre.mockResolvedValue(genre);

    const result = await deleteGenre(request);

    expect(removeGenre).toHaveBeenCalledWith(genre.id);
    expect(removeGenre).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      headers,
      statusCode: 200,
      body: genre,
    });
  });

  it("fails to delete genre", async () => {
    const genre = { id: Id.makeId(), name: "Drama" };

    const request = {
      params: {
        id: genre.id,
      },
    };
    const error = new Error("bad");

    removeGenre.mockRejectedValue(error);

    const result = await deleteGenre(request);

    expect(removeGenre).toHaveBeenCalledWith(genre.id);
    expect(removeGenre).toHaveBeenCalledTimes(1);

    expect(logger.warn).toHaveBeenCalledWith(error.message, error);
    expect(logger.warn).toHaveBeenCalledTimes(1);

    expect(result).toEqual({
      headers,
      statusCode: 400,
      body: error.message,
    });
  });
});
