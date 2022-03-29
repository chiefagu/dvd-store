import { addCustomer, listCustomers } from "./index.mjs";

describe("use-case: DI", () => {
  describe("make add customer", () => {
    it("should be defined", () => {
      expect(addCustomer).toBeDefined();
    });
  });
  describe("make list customers", () => {
    it("should be defined", () => {
      expect(listCustomers).toBeDefined();
    });
  });
});
