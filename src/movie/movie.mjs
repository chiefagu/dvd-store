import { upperFirst } from "../utils/upper-first.utils.mjs";

export function buildMovie({ Id }) {
  return function makeMovie({
    id = Id.makeId(),
    title,
    genreId,
    numberInStock,
    dailyRentalRate,
  }) {
    if (!(id && Id.validate(id))) {
      throw new Error("Movie must have a valid id");
    }

    if (!title) {
      throw new Error("Movie must have a title");
    }

    if (title.length < 6) {
      throw new Error("Movie title must have a minimum of 5 characters");
    }

    if (title.length > 256) {
      throw new Error("Movie title must have a maximum of 255 characters");
    }

    if (!(genreId && Id.validate(genreId))) {
      throw new Error("Movie must have a valid genreId");
    }

    if (!numberInStock) {
      throw new Error("Movie must have a stock quantity");
    }

    if (!dailyRentalRate) {
      throw new Error("Movie must have a rental rate");
    }
    return {
      getId: () => id,
      getTitle: () => upperFirst(title.trim()),
      getNumberInStock: () => numberInStock,
      getDailyRentalRate: () => dailyRentalRate,
    };
  };
}
