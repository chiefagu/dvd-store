import { makeCustomer } from ".";

describe("customer", () => {
  describe("missing name argument", () => {
    it("throws an error", () => {
      const validName = "James";
      expect(() =>
        makeCustomer({ name: validName })
      ).toThrowErrorMatchingInlineSnapshot(
        `"You must supply a customer phone no"`
      );
    });
  });
  describe("supplied name argument is too short", () => {
    it("throws an error", () => {
      const shortName = "ja";
      expect(() =>
        makeCustomer({ name: shortName })
      ).toThrowErrorMatchingInlineSnapshot(
        `"too short, must supply a customer name with 3 or more characters"`
      );
    });
  });
  describe("supplied name argument is too long", () => {
    it("throws an error", () => {
      const longName = getLongName();
      expect(() =>
        makeCustomer({ name: longName })
      ).toThrowErrorMatchingInlineSnapshot(
        `"too long, must supply a customer name with 50 characters or less"`
      );
    });
  });
  describe("missing phone argument", () => {
    it("throws an error", () => {
      const missingPhone = { name: "James", isGold: true };

      expect(() =>
        makeCustomer(missingPhone)
      ).toThrowErrorMatchingInlineSnapshot(
        `"You must supply a customer phone no"`
      );
    });
  });

  describe("successfully makes a valid customer", () => {
    it("returns valid properties", () => {
      const customerData = { name: "Joseph", phone: "0123456", isGold: true };

      expect(() => makeCustomer(customerData)).not.toThrow();

      const { getName, getPhone, isGold } = makeCustomer(customerData);

      expect(getName()).toBe(customerData.name);
      expect(getPhone()).toBe(customerData.phone);
      expect(isGold()).toEqual(customerData.isGold);
    });
  });
});

function getLongName(numberOfChars = 60) {
  return Array(numberOfChars).fill("h").join("");
}
