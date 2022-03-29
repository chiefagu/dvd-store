import { postCustomer, getCustomers } from "./index.mjs";

describe("controllers: DI", () => {
  describe("make post controller", () => {
    it("should be defined", () => {
      expect(postCustomer).toBeDefined();
    });
  });
  describe("make getCustomers controller", () => {
    it("should be defined", () => {
      expect(getCustomers).toBeDefined();
    });
  });
});
