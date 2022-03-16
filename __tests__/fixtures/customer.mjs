import { Id } from "../../src/utils/Id.mjs";

export function buildFakeCustomer(overrides = {}) {
  return {
    _id: Id.makeId(),
    name: "James Bond",
    phone: "08012345678",
    isGold: true,
    ...overrides,
  };
}
