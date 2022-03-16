import { makeCustomerDb } from "./customer-db.mjs";
import { buildFakeCustomer } from "../../../__tests__/fixtures/index.mjs";

describe("customer db", () => {
  const customerModel = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findByIdAndRemove: jest.fn(),
  };

  const customerDb = makeCustomerDb({ customerModel });

  it("successfully finds a customer matching id", async () => {
    const customer = buildFakeCustomer();

    customerModel.findById.mockResolvedValueOnce(customer);

    const actual = await customerDb.findById(customer._id);

    expect(customerModel.findById).toHaveBeenCalledTimes(1);
    expect(customerModel.findById).toHaveBeenCalledWith(customer._id);

    expect(actual).toEqual(customer);
  });

  it("successfully finds a customer matching the name", async () => {
    const customer = buildFakeCustomer({ name: "Jackie" });

    customerModel.findOne.mockResolvedValueOnce(customer);

    const actual = await customerDb.findByPhone(customer.phone);

    expect(customerModel.findOne).toHaveBeenCalledTimes(1);
    expect(customerModel.findOne).toHaveBeenCalledWith({
      phone: customer.phone,
    });

    expect(actual).toEqual(customer);
  });

  it("successfully saves customer data", async () => {
    const customer = buildFakeCustomer();

    const { _id: id, ...others } = { ...customer };

    customerModel.create.mockResolvedValueOnce(customer);

    const inserted = await customerDb.insert({ id, ...others });

    expect(customerModel.create).toHaveBeenCalledTimes(1);
    expect(customerModel.create).toHaveBeenCalledWith({ id, ...others });

    expect(inserted).toEqual(customer);
  });

  it("successfully updates the customer data", async () => {
    const customer = buildFakeCustomer({ name: "Gerald" });

    const update = { ...customer, name: "Peter" };

    customerModel.findByIdAndUpdate.mockResolvedValueOnce(update);

    const actual = await customerDb.update(customer._id, update);

    expect(customerModel.findByIdAndUpdate).toHaveBeenCalledTimes(1);

    expect(customerModel.findByIdAndUpdate).toHaveBeenCalledWith(
      customer._id,
      { $set: update },
      { new: true }
    );

    expect(actual).toEqual(update);
  });

  it("successfully deletes a customer data", async () => {
    const customer = buildFakeCustomer();

    const { _id: id } = { ...customer };

    customerModel.findByIdAndRemove.mockResolvedValueOnce(customer);

    const deleted = await customerDb.remove(id);

    expect(customerModel.findByIdAndRemove).toHaveBeenCalledTimes(1);
    expect(customerModel.findByIdAndRemove).toHaveBeenCalledWith(id);

    expect(deleted).toEqual(customer);
  });
});
