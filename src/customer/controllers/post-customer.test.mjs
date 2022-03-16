import { makePostCustomer } from "./post-customer.mjs";

import { buildFakeCustomer } from "../../../__tests__/fixtures/index.mjs";

describe("controllers: postCustomer", () => {
  const logger = { warn: jest.fn() };
  const addCustomer = jest.fn();

  const postCustomer = makePostCustomer({ addCustomer, logger });

  describe("successfully creates a customer", () => {
    it("returns a 201 status and customer data", async () => {
      const customer = buildFakeCustomer();

      const headers = { "Content-Type": "application/json" };

      addCustomer.mockResolvedValueOnce(customer);

      const httpRequest = { body: customer };

      const response = await postCustomer(httpRequest);

      expect(addCustomer).toHaveBeenCalledTimes(1);
      expect(addCustomer).toHaveBeenCalledWith(httpRequest.body);

      expect(response).toMatchObject({
        headers,
        statusCode: 201,
        body: { message: customer },
      });
    });
  });

  describe("failed to create a customer", () => {
    it("returns a 400 status and error message", async () => {
      const customer = buildFakeCustomer();

      const headers = { "Content-Type": "application/json" };

      const error = new Error("oh no");

      addCustomer.mockRejectedValueOnce(error);

      const httpRequest = { body: customer };

      const response = await postCustomer(httpRequest);

      expect(addCustomer).toHaveBeenCalledTimes(1);
      expect(addCustomer).toHaveBeenCalledWith(httpRequest.body);

      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(error.message, error);

      expect(response).not.toMatchObject({
        headers,
        statusCode: 201,
        body: { message: customer },
      });

      expect(response).toMatchObject({
        headers,
        statusCode: 400,
        body: { message: error.message },
      });
    });
  });
});
