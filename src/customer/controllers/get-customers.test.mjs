import { buildFakeCustomer } from "../../../__tests__/fixtures/customer.mjs";
import { makeGetCustomers } from "./get-customers.mjs";

describe("customer controller: getCustomers", () => {
  const listCustomers = jest.fn();
  const logger = { warn: jest.fn() };
  const getCustomers = makeGetCustomers({ listCustomers, logger });

  describe("sucessfully fetches all customers", () => {
    it("responds with a 200 status code and the list of customers", async () => {
      const headers = { "Content-Type": "application/json" };
      const customers = [
        buildFakeCustomer(),
        buildFakeCustomer({ name: "F k" }),
      ];

      listCustomers.mockResolvedValueOnce(customers);

      const actual = await getCustomers();

      expect(listCustomers).toHaveBeenCalledTimes(1);
      expect(listCustomers).toHaveBeenCalledWith(/** nothing */);

      expect(actual).toEqual({
        headers,
        statusCode: 200,
        body: { message: customers },
      });
    });
  });
  describe("fails to fetch all customers", () => {
    it("responds with a 400 status code and the error message", async () => {
      const headers = { "Content-Type": "application/json" };
      const customers = [
        buildFakeCustomer(),
        buildFakeCustomer({ name: "F k" }),
      ];

      const error = new Error("screams!");
      listCustomers.mockRejectedValueOnce(error);

      const actual = await getCustomers();

      expect(listCustomers).toHaveBeenCalledTimes(1);
      expect(listCustomers).toHaveBeenCalledWith(/** nothing */);

      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(error.message, error);

      expect(actual).not.toMatchObject({
        headers,
        statusCode: 200,
        body: { message: customers },
      });

      expect(actual).toMatchObject({
        headers,
        statusCode: 400,
        body: { message: error.message },
      });
    });
  });
});
