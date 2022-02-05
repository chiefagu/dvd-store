import { makeErrorHandler } from "./error.middleware.mjs";

describe("error middleware", () => {
  it("responds with a 500 error code and message", () => {
    const mockLogger = { warn: jest.fn() };
    const err = { message: "stuff" };
    const req = {};
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    };
    const errorHandler = makeErrorHandler(mockLogger);

    errorHandler(err, req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.send).toHaveBeenCalledWith("something went wrong");
    expect(res.send).toHaveBeenCalledTimes(1);
  });
});
