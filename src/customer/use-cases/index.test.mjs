import { addCustomer } from "./index.mjs";

describe("use-case: DI", () => {
  describe("make add customer", () => {
    it("should be defined", () => {
      expect(addCustomer).toBeDefined();
    });
  });
});
