import { buildMovie } from "./movie.mjs";
import { Id, upperFirst } from "../utils/index.mjs";

describe("makeMovie entity", () => {
  const makeMovie = buildMovie({ Id });

  describe("supplied with invalid/missing arguments", () => {
    it("throws an error if id is invalid", () => {
      const movie = { id: "bad id" };

      expect(() => makeMovie(movie)).toThrowErrorMatchingInlineSnapshot(
        `"Movie must have a valid id"`
      );
    });

    it("throws an error if the title is missing", () => {
      const movie = { id: Id.makeId(), title: "" };

      expect(() => makeMovie(movie)).toThrowErrorMatchingInlineSnapshot(
        `"Movie must have a title"`
      );
    });

    it("throws an error if the title is too short", () => {
      const movie = { id: Id.makeId(), title: "abc" };

      expect(() => makeMovie(movie)).toThrowErrorMatchingInlineSnapshot(
        `"Movie title must have a minimum of 5 characters"`
      );
    });

    it("throws an error if the title is too long", () => {
      const longString = Array(300).toString();

      const movie = { id: Id.makeId(), title: longString };

      expect(() => makeMovie(movie)).toThrowErrorMatchingInlineSnapshot(
        `"Movie title must have a maximum of 255 characters"`
      );
    });

    it("throws an error if genreId is invalid", () => {
      const movie = {
        id: Id.makeId(),
        title: "good title",
        genreId: "abc",
      };

      expect(() => makeMovie(movie)).toThrowErrorMatchingInlineSnapshot(
        `"Movie must have a valid genreId"`
      );
    });

    it("throws an error if numberInStock is invalid", () => {
      const movie = {
        id: Id.makeId(),
        title: "good title",
        genreId: Id.makeId(),
        numberInStock: "",
      };

      expect(() => makeMovie(movie)).toThrowErrorMatchingInlineSnapshot(
        `"Movie must have a stock quantity"`
      );
    });

    it("throws an error if dailyRentalRate is invalid", () => {
      const movie = {
        id: Id.makeId(),
        title: "good title",
        genreId: Id.makeId(),
        numberInStock: "5",
        dailyRentalRate: null,
      };

      expect(() => makeMovie(movie)).toThrowErrorMatchingInlineSnapshot(
        `"Movie must have a rental rate"`
      );
    });
  });

  describe("supplied with valid arguments", () => {
    it("should not throw an error", () => {
      const movie = {
        id: Id.makeId(),
        title: "good title",
        genreId: Id.makeId(),
        numberInStock: "5",
        dailyRentalRate: 100,
      };

      expect(() => makeMovie(movie)).not.toThrow();
    });

    it("returns valid parameters", () => {
      const movie = {
        id: Id.makeId(),
        title: "good title",
        genreId: Id.makeId(),
        numberInStock: "5",
        dailyRentalRate: "100",
      };

      const { getId, getTitle, getDailyRentalRate, getNumberInStock } =
        makeMovie(movie);

      expect(getId()).toBe(movie.id);
      expect(getTitle()).toBe(upperFirst(movie.title));
      expect(getDailyRentalRate()).toBe(movie.dailyRentalRate);
      expect(getNumberInStock()).toBe(movie.numberInStock);
    });
  });
});
