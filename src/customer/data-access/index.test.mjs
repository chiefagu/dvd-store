import { customerDb } from "./index.mjs";

describe("customerDb: DI", () => {
  describe("make the customerDb", () => {
    it("should be defined", () => {
      expect(customerDb).toBeDefined();
    });
  });
});
