import { makeIsAdmin } from "./is-admin";

describe("isAdmin middleware", () => {
  const isAdmin = makeIsAdmin();

  describe("when user is not an admin", () => {
    it("returns a 403 error code and message", () => {
      const req = { user: null };
      const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
      const next = jest.fn();

      isAdmin(req, res, next);

      expect(next).not.toHaveBeenCalled();

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.status).toHaveBeenCalledTimes(1);

      expect(res.json.mock.calls[0][0]).toMatchInlineSnapshot(`
        Object {
          "message": "unauthorized user",
        }
      `);

      expect(res.json).toHaveBeenCalledTimes(1);
    });
  });

  describe("user is an admin", () => {
    it("allows the request to go forward", () => {
      const req = { user: { isAdmin: true } };
      const res = { status: jest.fn(() => res), json: jest.fn(() => res) };
      const next = jest.fn();

      isAdmin(req, res, next);

      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).not.toHaveBeenCalled();

      expect(next).toHaveBeenCalled();
    });
  });
});
