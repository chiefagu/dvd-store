import { buildFakeCustomer } from "../../../__tests__/fixtures/customer.mjs";
import { makeListCustomers } from "./list-customers.mjs";

describe("use-case: makeListCustomers", () => {
  const customerDb = { findAll: jest.fn() };
  const listCustomers = makeListCustomers({ customerDb });

  describe("given customers data is stored", () => {
    it("returns an array of customers", async () => {
      const customers = [
        buildFakeCustomer(),
        buildFakeCustomer({ name: "Bala Fred" }),
      ];

      customerDb.findAll.mockResolvedValue(customers);

      const actual = await listCustomers();

      expect(customerDb.findAll).toHaveBeenCalledTimes(1);
      expect(customerDb.findAll).toHaveBeenCalledWith(/** nothing */);

      expect(actual).toEqual(expect.arrayContaining(customers));
    });
  });

  describe("no customer data exists", () => {
    it("returns an empty array", async () => {
      const customers = [
        buildFakeCustomer(),
        buildFakeCustomer({ name: "Bala Fred" }),
      ];

      customerDb.findAll.mockResolvedValue([]);

      const actual = await listCustomers();

      expect(customerDb.findAll).toHaveBeenCalledTimes(1);
      expect(customerDb.findAll).toHaveBeenCalledWith(/** nothing */);

      expect(actual).not.toEqual(expect.arrayContaining(customers));
      expect(actual).toEqual([]);
    });
  });
});
