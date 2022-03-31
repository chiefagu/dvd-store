import { makeAddCustomer } from "./add-customer.mjs";

import {
  buildFakeCustomer,
  resolve,
} from "../../../__tests__/fixtures/index.mjs";

describe("use-case: makeAddCustomer", () => {
  const customerDb = { insert: jest.fn(), findByPhone: jest.fn() };

  const addCustomer = makeAddCustomer({ customerDb });

  describe("given already existing customer details", () => {
    it("throws an error", async () => {
      const customer = buildFakeCustomer();

      const { name, phone, isGold } = { ...customer };

      const exists = { ...customer };

      customerDb.findByPhone.mockResolvedValueOnce(exists);
      customerDb.insert.mockResolvedValueOnce(customer);

      const error = await addCustomer({ name, phone, isGold }).catch(resolve);

      expect(customerDb.findByPhone).toHaveBeenCalledTimes(1);
      expect(customerDb.findByPhone).toHaveBeenCalledWith(customer.phone);

      expect(customerDb.insert).not.toHaveBeenCalled();

      expect(error).toMatchInlineSnapshot(
        `[Error: This phone no is already in use, review details and try again]`
      );
    });
  });

  describe("given unique customer arguments", () => {
    it("successfully adds a customer", async () => {
      const customer = buildFakeCustomer();

      const { name, phone, isGold } = { ...customer };

      customerDb.insert.mockResolvedValueOnce(customer);

      const actual = await addCustomer({ name, phone, isGold });

      expect(customerDb.insert).toHaveBeenCalledTimes(1);
      expect(customerDb.insert).toHaveBeenCalledWith({
        name,
        phone,
        isGold,
      });

      expect(actual).toEqual(customer);
    });
  });
});
