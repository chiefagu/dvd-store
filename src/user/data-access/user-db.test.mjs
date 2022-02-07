import { mockUserModel } from "../../../__tests__/fixtures/db.mjs";
import { buildFakeUser } from "../../../__tests__/fixtures/user.mjs";
import { makeUserDb } from "./user-db.mjs";

describe("userDB", () => {
  const userModel = mockUserModel();
  const userDb = makeUserDb({ userModel });

  it("finds a user with a given id", async () => {
    const user = buildFakeUser();

    userModel.findById.mockResolvedValueOnce(user);

    const found = await userDb.findById(user.id);

    expect(userModel.findById).toHaveBeenCalledWith(user.id);
    expect(userModel.findById).toHaveBeenCalledTimes(1);

    expect(found).toEqual(user);
  });

  it("finds a user with a given email", async () => {
    const user = buildFakeUser();

    userModel.findOne.mockResolvedValueOnce(user);

    const found = await userDb.findByEmail(user.email);

    expect(userModel.findOne).toHaveBeenCalledWith({ email: user.email });
    expect(userModel.findOne).toHaveBeenCalledTimes(1);

    expect(found).toEqual(user);
  });

  it("saves a user to the db", async () => {
    const user = buildFakeUser();

    userModel.create.mockResolvedValueOnce(user);

    const actual = await userDb.insert(user);

    expect(userModel.create).toHaveBeenCalledWith(user);
    expect(userModel.create).toHaveBeenCalledTimes(1);

    expect(actual).toEqual(user);
  });

  it("deletes a user data", async () => {
    const user = buildFakeUser();

    userModel.findByIdAndRemove.mockResolvedValueOnce(user);

    const deleted = await userDb.remove(user.id);

    expect(userModel.findByIdAndRemove).toHaveBeenCalledWith(user.id);
    expect(userModel.findByIdAndRemove).toHaveBeenCalledTimes(1);

    expect(deleted).toEqual(user);
  });
});
