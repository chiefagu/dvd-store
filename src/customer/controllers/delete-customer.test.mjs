import { makeDeleteCustomer } from "./delete-customer.mjs";

import { buildFakeCustomer } from "../../../__tests__/fixtures/index.mjs";

describe("controller: deleteCustomer", () => {
  const removeCustomer = jest.fn();
  const logger = { warn: jest.fn() };

  const deleteCustomer = makeDeleteCustomer({ removeCustomer, logger });
  /**
   * deleteCustomer controller
   *
   * delete data with the use-case
   * respond with deleted data
   * if error
   * catch error and respond
   */

  describe("successfully deletes customer data", () => {
    it("responds with a 200 status code and the deleted data", async () => {
      const headers = { "Content-Type": "application/json" };

      const customer = buildFakeCustomer();

      const httpRequest = {
        params: { id: customer._id },
      };

      removeCustomer.mockReturnValueOnce(customer);

      const deleted = await deleteCustomer(httpRequest);

      expect(logger.warn).not.toHaveBeenCalled();

      expect(removeCustomer).toHaveBeenCalledTimes(1);
      expect(removeCustomer).toHaveBeenCalledWith(httpRequest.params.id);

      expect(deleted).toMatchObject({
        headers,
        statusCode: 200,
        body: { message: customer },
      });
    });
  });

  describe("fails to delete customer data", () => {
    it("responds with a 400 status code and an error", async () => {
      const headers = { "Content-Type": "application/json" };

      const customer = buildFakeCustomer();

      const httpRequest = {
        params: { id: customer._id },
      };

      const error = new Error("arrgh");
      removeCustomer.mockRejectedValueOnce(error);

      const actual = await deleteCustomer(httpRequest);

      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(logger.warn).toHaveBeenCalledWith(error.message, error);

      expect(removeCustomer).toHaveBeenCalledTimes(1);
      expect(removeCustomer).toHaveBeenCalledWith(httpRequest.params.id);

      expect(actual).not.toMatchObject({
        headers,
        statusCode: 200,
        body: { message: customer },
      });

      expect(actual).toMatchObject({
        headers,
        statusCode: 400,
        body: { message: error.message },
      });
    });
  });
});
