import { makeNotFoundHandler } from "./not-found.middleware.mjs";

describe("not found middleware", () => {
  it("returns a 404 code and message", () => {
    const mockLogger = { warn: jest.fn() };
    const req = {
      method: "GET",
      url: "a url",
    };
    const res = {
      status: jest.fn(() => res),
      send: jest.fn(() => res),
    };

    const notFoundHandler = makeNotFoundHandler(mockLogger);

    notFoundHandler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.status).toHaveBeenCalledTimes(1);

    expect(res.send.mock.calls[0][0]).toMatchInlineSnapshot(
      `"Could not GET a url"`
    );
  });
});
