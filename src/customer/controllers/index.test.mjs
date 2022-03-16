import { postCustomer } from "./index.mjs";

describe("controllers: DI", () => {
  describe("make post controller", () => {
    it("should be defined", () => {
      expect(postCustomer).toBeDefined();
    });
  });
});
