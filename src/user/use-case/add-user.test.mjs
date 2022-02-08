import config from "config";

import { makeAddUser } from "./add-user.mjs";
import { mockUserDb } from "../../../__tests__/fixtures/db.mjs";
import { getHash, signJwt } from "../../utils/index.mjs";
import { buildFakeUser } from "../../../__tests__/fixtures/user.mjs";

describe("add-user", () => {
  const userDb = mockUserDb();
  const addUser = makeAddUser({ userDb, getHash, signJwt, config });

  describe("when user exists", () => {
    it("throws an error", async () => {
      const userInfo = buildFakeUser();

      userDb.findByEmail.mockResolvedValueOnce(userInfo);

      try {
        await addUser(userInfo);

        expect(userDb.findByEmail).toHaveBeenCalledWith(userInfo.email);
        expect(userDb.findByEmail).toHaveBeenCalledTimes(1);
      } catch (e) {
        expect(e.message).toMatchInlineSnapshot(`"User already exists"`);
      }
    });
  });

  describe("when it's a new user", () => {
    it("save user info", async () => {
      const user = buildFakeUser();
      const hashedPassword = getHash(user.password);

      userDb.findByEmail.mockResolvedValueOnce(null);
      userDb.insert.mockResolvedValueOnce(user);

      await addUser(user);

      expect(userDb.findByEmail).toHaveBeenCalledWith(user.email);
      expect(userDb.findByEmail).toHaveBeenCalledTimes(1);

      expect(userDb.insert).toHaveBeenCalledWith({
        name: user.name,
        email: user.email,
        password: hashedPassword,
      });
      expect(userDb.insert).toHaveBeenCalledTimes(1);
    });

    it("returns an accessToken and refreshToken", async () => {
      const user = buildFakeUser();
      const hashedPassword = getHash(user.password);

      userDb.findByEmail.mockResolvedValueOnce(null);
      userDb.insert.mockResolvedValueOnce(user);

      const actual = await addUser(user);

      expect(userDb.findByEmail).toHaveBeenCalledWith(user.email);
      expect(userDb.findByEmail).toHaveBeenCalledTimes(1);

      expect(userDb.insert).toHaveBeenCalledWith({
        name: user.name,
        email: user.email,
        password: hashedPassword,
      });
      expect(userDb.insert).toHaveBeenCalledTimes(1);

      expect(actual).toMatchObject({
        accessToken: expect.any(String),
        refreshToken: expect.any(String),
      });
    });
  });
});
