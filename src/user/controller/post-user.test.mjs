import { makePostUser } from "./post-user.mjs";
import { buildFakeUser } from "../../../__tests__/fixtures/user.mjs";

describe("postUser controller", () => {
  const addUser = jest.fn();
  const postUser = makePostUser({ addUser });

  it("successfully adds a user", async () => {
    const headers = { "Content-Type": "application/json" };
    const user = buildFakeUser();

    addUser.mockResolvedValueOnce(user);

    let actual = await postUser({ body: user });

    expect(addUser).toHaveBeenCalledWith(user);
    expect(addUser).toHaveBeenCalledTimes(1);

    expect(actual).toMatchObject({ headers, statusCode: 201, body: user });
  });

  it("reports errors to the user", async () => {
    const headers = { "Content-Type": "application/json" };
    const user = buildFakeUser();

    addUser.mockRejectedValueOnce(new Error("cry"));

    try {
      await postUser({ body: user });
      expect(addUser).toHaveBeenCalledWith(user);
      expect(addUser).toHaveBeenCalledTimes(1);
    } catch (e) {
      expect(e).toMatchObject({ headers, statusCode: 400, body: "cry" });
    }
  });
});
