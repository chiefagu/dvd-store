import { makeEditCustomer } from "./edit-customer.mjs";
import { Id } from "../../utils/index.mjs";
import {
  resolve,
  buildFakeCustomer,
} from "../../../__tests__/fixtures/index.mjs";

describe("customer use-case: editCustomer", () => {
  const customerDb = { findById: jest.fn(), update: jest.fn() };
  const editCustomer = makeEditCustomer({ customerDb, Id });

  describe("request contains an invalid id", () => {
    it("throws an error message", async () => {
      const customer = buildFakeCustomer({ _id: "bad" });

      customerDb.findById.mockRejectedValueOnce(new Error("bad id"));

      const error = await editCustomer({ id: customer._id, ...customer }).catch(
        resolve
      );

      expect(customerDb.findById).not.toHaveBeenCalled();

      expect(error).toMatchInlineSnapshot(
        `[Error: You must supply a valid id]`
      );
    });
  });

  describe("given the request has a valid id", () => {
    describe("and a customer with a matching id is found", () => {
      it("throws an error message", async () => {
        const customer = buildFakeCustomer();

        customerDb.findById.mockRejectedValueOnce(new Error("404"));

        const error = await editCustomer({
          id: customer._id,
          ...customer,
        }).catch(resolve);

        expect(customerDb.findById).toHaveBeenCalledTimes(1);
        expect(customerDb.findById).toHaveBeenCalledWith(customer._id);

        expect(error).toMatchInlineSnapshot(`[Error: 404]`);
      });
    });

    describe("the customers data exists", () => {
      it("returns the customer data", async () => {
        const customer = buildFakeCustomer();

        const changes = buildFakeCustomer({
          _id: customer._id,
          name: "Richie",
        });

        customerDb.findById.mockResolvedValueOnce(customer);

        const update = { ...customer, ...changes };

        customerDb.update.mockResolvedValueOnce(update);

        const actual = await editCustomer({ id: customer._id, ...changes });

        expect(customerDb.findById).toHaveBeenCalledTimes(1);
        expect(customerDb.findById).toHaveBeenCalledWith(customer._id);

        expect(customerDb.update).toHaveBeenCalledTimes(1);
        expect(customerDb.update).toHaveBeenCalledWith(customer._id, {
          name: update.name,
          phone: update.phone,
          isGold: update.isGold,
        });

        expect(actual).toMatchObject(update);
      });
    });
  });
});
