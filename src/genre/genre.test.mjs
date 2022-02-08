import { buildGenre } from "./genre.mjs";

describe("genre entity", () => {
  let makeGenre;
  beforeAll(() => {
    makeGenre = buildGenre();
  });

  describe("invalid/missing fields", () => {
    it("throws an error if name is invalid", () => {
      expect(() =>
        makeGenre({ name: null })
      ).toThrowErrorMatchingInlineSnapshot(
        `"no genre, must supply a genre name"`
      );

      const tooShort = "Aa";
      expect(() =>
        makeGenre({ name: tooShort })
      ).toThrowErrorMatchingInlineSnapshot(
        `"too short, must supply a genre with more than 3 characters"`
      );

      const tooLong = "ToooooooooooooooooooooLoooong";
      expect(() =>
        makeGenre({ name: tooLong })
      ).toThrowErrorMatchingInlineSnapshot(
        `"too long, must supply a genre with 20 characters or fewer"`
      );
    });
  });

  describe("valid field", () => {
    it("returns valid genre attributes", () => {
      const genre = { name: "Comedy" };

      const { getName } = makeGenre(genre);

      expect(getName()).toBe(genre.name);
    });

    it("returns normalized genre attributes", () => {
      const genre = { name: "comedy  " };

      const { getName } = makeGenre(genre);

      const normalizedGenre = "Comedy"; // trimed and uppercased

      expect(getName()).toBe(normalizedGenre);
    });
  });
});
