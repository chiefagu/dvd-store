import { makePutCustomer } from "./put-customer.mjs";

import { buildFakeCustomer } from "../../../__tests__/fixtures/index.mjs";

describe("customer controller: putCustomer", () => {
  const editCustomer = jest.fn();
  const logger = { warn: jest.fn() };

  const putCustomer = makePutCustomer({ editCustomer, logger });

  describe("successfully edits the customer data", () => {
    it("returns the modified data", async () => {
      const headers = { "Content-Type": "application/json" };
      const customer = buildFakeCustomer();

      const { _id: id, ...changes } = { ...customer };

      editCustomer.mockResolvedValueOnce(customer);

      const httpRequest = {
        params: { id },
        body: { id, ...changes },
      };

      const modified = await putCustomer(httpRequest);

      expect(editCustomer).toHaveBeenCalledTimes(1);
      expect(editCustomer).toHaveBeenCalledWith({
        id: httpRequest.params.id,
        ...httpRequest.body,
      });

      expect(modified).toMatchObject({
        headers,
        statusCode: 201,
        body: { message: customer },
      });
    });
  });

  describe("failed to edit the customer data", () => {
    it("return a 400 status code and an error message", async () => {
      const headers = { "Content-Type": "application/json" };
      const customer = buildFakeCustomer();

      const { _id: id, ...changes } = { ...customer };

      const error = new Error("no dice");
      editCustomer.mockRejectedValueOnce(error);

      const httpRequest = {
        params: { id },
        body: { id, ...changes },
      };

      const modified = await putCustomer(httpRequest);

      expect(editCustomer).toHaveBeenCalledTimes(1);
      expect(editCustomer).toHaveBeenCalledWith({
        id: httpRequest.params.id,
        ...httpRequest.body,
      });

      expect(modified).not.toMatchObject({
        headers,
        statusCode: 201,
        body: { message: customer },
      });

      expect(modified).toMatchObject({
        headers,
        statusCode: 400,
        body: { message: error.message },
      });
    });
  });
});
