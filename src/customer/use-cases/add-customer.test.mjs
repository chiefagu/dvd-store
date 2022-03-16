import { makeAddCustomer } from "./add-customer.mjs";

import {
  buildFakeCustomer,
  resolve,
} from "../../../__tests__/fixtures/index.mjs";

describe("use-case: makeAddCustomer", () => {
  const customerDb = { create: jest.fn() };

  const addCustomer = makeAddCustomer({ customerDb });

  describe("given invalid customer arguments", () => {
    it("successfully adds a customer", async () => {
      const customer = buildFakeCustomer();

      const { name, phone, isGold } = { ...customer };

      customerDb.create.mockResolvedValueOnce(customer);

      const actual = await addCustomer({ name, phone, isGold });

      expect(customerDb.create).toHaveBeenCalledTimes(1);
      expect(customerDb.create).toHaveBeenCalledWith({
        name,
        phone,
        isGold,
      });

      expect(actual).toEqual(customer);
    });
  });
  describe("given an invalid customer name", () => {
    it("failed to save the customer data", async () => {
      const tooShort = "j";

      const customer = buildFakeCustomer({ name: tooShort });

      const { name, phone, isGold } = { ...customer };

      customerDb.create.mockResolvedValueOnce(customer);

      const error = await addCustomer({ name, phone, isGold }).catch(resolve);

      expect(customerDb.create).not.toHaveBeenCalled();
      expect(error).toMatchInlineSnapshot(
        `[Error: too short, must supply a customer name with 3 or more characters]`
      );
    });
  });
});
