import { makeRemoveCustomer } from "./remove-customer.mjs";
import {
  resolve,
  buildFakeCustomer,
} from "../../../__tests__/fixtures/index.mjs";
import { Id } from "../../utils/index.mjs";

describe("customer use-case: removeCustomer", () => {
  const customerDb = { findByIdAndRemove: jest.fn() };
  const removeCustomer = makeRemoveCustomer({ customerDb, Id });

  describe("supplied an invalid id", () => {
    it("throws an error message", async () => {
      const customer = buildFakeCustomer({ _id: "bad" });

      const error = await removeCustomer(customer._id).catch(resolve);

      expect(customerDb.findByIdAndRemove).not.toHaveBeenCalled();

      expect(error).toMatchInlineSnapshot(
        `[Error: You must provide a valid id]`
      );
    });
  });

  describe("supplied a valid id", () => {
    describe("failed to remove the customer data", () => {
      it("throws an error message", async () => {
        const customer = buildFakeCustomer();

        customerDb.findByIdAndRemove.mockResolvedValueOnce(null);

        const error = await removeCustomer(customer._id).catch(resolve);

        expect(customerDb.findByIdAndRemove).toHaveBeenCalledTimes(1);
        expect(customerDb.findByIdAndRemove).toHaveBeenCalledWith(customer._id);

        expect(error).toMatchInlineSnapshot(`[Error: No data found]`);
      });
    });

    describe("successfully removes the customer data", () => {
      it("return the deleted data", async () => {
        const customer = buildFakeCustomer();

        customerDb.findByIdAndRemove.mockResolvedValue(customer);

        const deleted = await removeCustomer(customer._id);

        expect(customerDb.findByIdAndRemove).toHaveBeenCalledTimes(1);
        expect(customerDb.findByIdAndRemove).toHaveBeenCalledWith(customer._id);

        expect(deleted).toMatchObject(customer);
      });
    });
  });
});
