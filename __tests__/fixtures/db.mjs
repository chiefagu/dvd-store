export function mockUserModel(overrides) {
  const model = {
    findById: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    findByIdAndRemove: jest.fn(),
  };

  return {
    ...model,
    ...overrides,
  };
}

export function mockUserDb(overrides) {
  const userDb = {
    findByEmail: jest.fn(),
    findById: jest.fn(),
    insert: jest.fn(),
    remove: jest.fn(),
  };

  return {
    ...userDb,
    ...overrides,
  };
}
