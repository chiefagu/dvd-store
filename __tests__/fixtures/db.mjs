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
