import { upperFirst } from "../utils/upper-first.utils.mjs";

export function buildGenre() {
  return function makeGenre({ name }) {
    if (!name) {
      throw new Error("no genre, must supply a genre name");
    }

    name = normalize(name);

    if (name.length <= 3) {
      throw new Error(
        "too short, must supply a genre with more than 3 characters"
      );
    }

    if (name.length >= 20) {
      throw new Error(
        "too long, must supply a genre with 20 characters or fewer"
      );
    }

    return Object.freeze({
      getName: () => name,
    });
  };
}

function normalize(name) {
  return upperFirst(name.trim());
}
