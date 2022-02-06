import { Id } from "../../src/utils/Id.mjs";

export function buildFakeUser(overrides) {
  const user = {
    id: Id.makeId(),
    name: "James",
    email: "james@email.com",
    password: "12345678",
  };

  return {
    ...user,
    ...overrides,
  };
}
