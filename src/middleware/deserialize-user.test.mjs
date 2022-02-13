import { makeDeserializeUser } from "./deserialize-user.mjs";

describe("deserialize user middleware", () => {
  const logger = { warn: jest.fn() };
  const reIssueAcessToken = jest.fn();
  const verifyJwt = jest.fn();

  const deserializeUser = makeDeserializeUser({
    verifyJwt,
    reIssueAcessToken,
    logger,
  });

  describe("no access token provided", () => {
    it("responds with 400 status code and an error message", async () => {
      const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
      const req = { get: jest.fn(() => null), setHeader: jest.fn() };
      const next = jest.fn();

      await deserializeUser(req, res, next);

      expect(next).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.status).toHaveBeenCalledTimes(1);

      expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "message": "missing access token",
        }
      `);
    });
  });

  describe("can't decode token", () => {
    it("responds with a 401 code and message", async () => {
      const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
      const req = { get: jest.fn(), setHeader: jest.fn() };
      const next = jest.fn();

      req.get.mockReturnValue("Bearer 'fake-token'");

      verifyJwt.mockReturnValue({ decoded: null });

      await deserializeUser(req, res, next);

      expect(next).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.status).toHaveBeenCalledTimes(1);

      expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "message": "invalid access token",
        }
      `);
      expect(res.json).toHaveBeenCalledTimes(1);

      expect(logger.warn).toHaveBeenCalledWith("invalid access token");
      expect(logger.warn).toHaveBeenCalledTimes(1);
    });
  });

  describe("token expired and missing a refresh token", () => {
    it("responds with 401 status code and an error message", () => {
      const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
      const req = { get: jest.fn(), setHeader: jest.fn() };
      const next = jest.fn();

      req.get.mockReturnValueOnce("Bearer 'fake-token'").mockReturnValue();

      verifyJwt.mockReturnValue({ decoded: "was decoded", expired: true });

      deserializeUser(req, res, next);

      expect(next).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.status).toHaveBeenCalledTimes(1);

      expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "message": "expired token",
        }
      `);
    });
  });

  describe("jwt token is valid but expired", () => {
    describe("failed to reissue a new access token", () => {
      it("responds with 500 status code and an error message", async () => {
        const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
        const req = { get: jest.fn(), setHeader: jest.fn() };
        const next = jest.fn();

        req.get
          .mockReturnValueOnce("Bearer 'fake-token'")
          .mockReturnValue("refresh-token exists");

        verifyJwt.mockReturnValue({ decoded: "was decoded", expired: true });
        reIssueAcessToken.mockResolvedValueOnce(null);

        await deserializeUser(req, res, next);

        expect(next).not.toHaveBeenCalled();

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.status).toHaveBeenCalledTimes(1);

        expect(res.json).toHaveBeenCalledTimes(1);
        expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
          Object {
            "message": "Something went wrong",
          }
        `);
      });
    });
  });

  describe("jwt token is valid but expired", () => {
    describe("succesfully reissued a new access token", () => {
      it("sets x-accesToken header to the new token and calls next", async () => {
        const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
        const req = { get: jest.fn(), setHeader: jest.fn() };
        const next = jest.fn();

        req.get
          .mockReturnValueOnce("Bearer 'fake-token'")
          .mockReturnValue("refresh-token exists");

        const decoded = "was decoded";
        verifyJwt.mockReturnValue({ decoded, expired: true, valid: true });

        const fakeNewToken = "new token";
        reIssueAcessToken.mockResolvedValueOnce(fakeNewToken);

        await deserializeUser(req, res, next);

        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();

        expect(req.setHeader).toHaveBeenCalledWith(
          "x-accessToken",
          fakeNewToken
        );
        expect(req.setHeader).toHaveBeenCalledTimes(1);

        expect(req.user).toEqual(decoded);

        expect(next).toHaveBeenCalledWith(/** nothing */);
        expect(next).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe("successfully decoded the jwt token", () => {
    it("attaches a user to the req obj and calls next", () => {
      const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
      const req = { get: jest.fn(), setHeader: jest.fn(), user: {} };
      const next = jest.fn();

      req.get.mockReturnValue("Bearer 'fake-token'");

      const decoded = "was decoded";
      verifyJwt.mockReturnValue({ decoded });

      deserializeUser(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();

      expect(req.user).toEqual(decoded);

      expect(next).toHaveBeenCalledWith(/** nothing */);
      expect(next).toHaveBeenCalledTimes(1);
    });
  });
});
