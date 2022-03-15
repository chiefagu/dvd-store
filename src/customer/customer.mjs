export function buildCustomer() {
  return function makeCustomer({ name, phone, isGold = false }) {
    if (!name) {
      throw new Error("You must supply a valid customer name");
    }

    if (name.length <= 2) {
      throw new Error(
        "too short, must supply a customer name with 3 or more characters"
      );
    }

    if (name.length > 50) {
      throw new Error(
        "too long, must supply a customer name with 50 characters or less"
      );
    }

    if (!phone) {
      throw new Error("You must supply a customer phone no");
    }

    return Object.freeze({
      getName: () => name,
      getPhone: () => phone,
      isGold: () => isGold,
    });
  };
}
