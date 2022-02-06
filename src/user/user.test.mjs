import { buildUser } from "./user.mjs";
import { Id } from "../utils/Id.mjs";
import { buildFakeUser } from "../../__tests__/fixtures/user.mjs";

describe("user entity", () => {
  let makeUser;
  beforeAll(() => {
    makeUser = buildUser({ Id });
  });

  describe("invalid/missing fields", () => {
    it("throws an error if id is invalid", () => {
      const userInput = buildFakeUser({ id: "bad-id" });

      expect(() => makeUser(userInput)).toThrowErrorMatchingInlineSnapshot(
        `"invalid id, must supply a valid id"`
      );
    });

    it("throws an error if name is invalid", () => {
      let userInput = buildFakeUser({ name: "" });

      expect(() => makeUser(userInput)).toThrowErrorMatchingInlineSnapshot(
        `"no name, must supply a name"`
      );

      userInput = buildFakeUser({ name: "Jo" });

      expect(() => makeUser(userInput)).toThrowErrorMatchingInlineSnapshot(
        `"too short, must supply a name with more than 2 characters"`
      );

      const name = "tooooooooooooooooooooooLoooooooooooooooooog";
      expect(() =>
        makeUser(buildFakeUser({ name }))
      ).toThrowErrorMatchingInlineSnapshot(
        `"too long, must supply a name with 30 charaacters or less"`
      );
    });

    it("throws an error if email is invalid", () => {
      expect(() =>
        makeUser(buildFakeUser({ name: "" }))
      ).toThrowErrorMatchingInlineSnapshot(`"no name, must supply a name"`);

      expect(() =>
        makeUser(buildFakeUser({ email: "bad email" }))
      ).toThrowErrorMatchingInlineSnapshot(
        `"invalid email, must supply a valid email adddress"`
      );
    });

    it("throws an error if password is invalid", () => {
      expect(() =>
        makeUser(buildFakeUser({ password: "" }))
      ).toThrowErrorMatchingInlineSnapshot(
        `"no password, must supply a password"`
      );

      expect(() =>
        makeUser(buildFakeUser({ password: "short" }))
      ).toThrowErrorMatchingInlineSnapshot(
        `"too short, must supply a password with 6 characters or more"`
      );

      const password =
        "tooooooooooooooooooooooooooooooooooo Loooooonnnnnggggggg";
      expect(() =>
        makeUser(buildFakeUser({ password }))
      ).toThrowErrorMatchingInlineSnapshot(
        `"too long, must supply a password with 50 characters or less"`
      );
    });
  });

  describe("valid fields", () => {
    it("return an object with getters", () => {
      const userInput = buildFakeUser();

      const userGetters = makeUser(userInput);

      expect(userGetters).toMatchInlineSnapshot(`
        Object {
          "getEmail": [Function],
          "getId": [Function],
          "getName": [Function],
          "getPassword": [Function],
        }
      `);
    });
    it("returns valid user attributes", () => {
      const userInput = buildFakeUser();

      const { getId, getName, getEmail, getPassword } = makeUser(userInput);

      expect(getId()).toBe(userInput.id);
      expect(getName()).toBe(userInput.name);
      expect(getEmail()).toBe(userInput.email);
      expect(getPassword()).toBe(userInput.password);
    });
  });
});
