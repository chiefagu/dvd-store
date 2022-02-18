import { Id } from "../../utils/Id.mjs";
import { makePutMovie } from "./put-movie.mjs";

describe("put movie controller", () => {
  let putMovie;
  const editMovie = jest.fn();
  const logger = { warn: jest.fn() };
  beforeAll(() => {
    putMovie = makePutMovie({ editMovie, logger });
  });

  it("succesfully updated movies info", async () => {
    const request = {
      params: { id: Id.makeId() },
      body: {
        title: "A title",
        genreId: Id.makeId(),
        numberInStock: "100",
        dailyRentalRate: "20",
      },
    };

    const headers = { "Content-Type": "application/json" };

    editMovie.mockResolvedValueOnce({ ...request.body });

    const updated = await putMovie(request);

    expect(editMovie).toHaveBeenCalledWith({
      id: request.params.id,
      ...request.body,
    });
    expect(editMovie).toHaveBeenCalledTimes(1);

    expect(logger.warn).not.toHaveBeenCalled();

    expect(updated).toMatchObject({
      headers,
      statusCode: 201,
      body: request.body,
    });
  });

  it("failed to update movie info", async () => {
    const request = {
      params: { id: Id.makeId() },
      body: {
        title: "A title",
        genreId: Id.makeId(),
        numberInStock: "100",
        dailyRentalRate: "20",
      },
    };

    const headers = { "Content-Type": "application/json" };

    const error = new Error("scream");
    editMovie.mockRejectedValueOnce(error);

    const updated = await putMovie(request);

    expect(editMovie).toHaveBeenCalledWith({
      id: request.params.id,
      ...request.body,
    });
    expect(editMovie).toHaveBeenCalledTimes(1);

    expect(logger.warn).toHaveBeenCalledWith(error.message, error);
    expect(logger.warn).toHaveBeenCalledTimes(1);

    expect(updated).toMatchObject({
      headers,
      statusCode: 400,
      body: error.message,
    });
  });
});
