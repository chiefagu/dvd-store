import { isEmail, upperFirst } from "../utils/index.mjs";

export function buildUser({ Id }) {
  return function makeUser({ id = Id.makeId(), name, email, password }) {
    if (!Id.validate(id)) {
      throw new Error("invalid id, must supply a valid id");
    }
    if (!name) {
      throw new Error("no name, must supply a name");
    }
    if (name.length <= 2) {
      throw new Error(
        "too short, must supply a name with more than 2 characters"
      );
    }
    if (name.length >= 30) {
      throw new Error(
        "too long, must supply a name with 30 charaacters or less"
      );
    }

    if (!email) {
      throw new Error("no email, must supply an email");
    }

    if (!isEmail(email)) {
      throw new Error("invalid email, must supply a valid email adddress");
    }

    if (!password) {
      throw new Error("no password, must supply a password");
    }

    if (password.length <= 5) {
      throw new Error(
        "too short, must supply a password with 6 characters or more"
      );
    }

    if (password.length > 50) {
      throw new Error(
        "too long, must supply a password with 50 characters or less"
      );
    }

    const { Nname, Nemail, Npassword } = normalize({ name, email, password });

    return Object.freeze({
      getId: function () {
        return id;
      },
      getName: function () {
        return Nname;
      },
      getEmail: function () {
        return Nemail;
      },
      getPassword: function () {
        return Npassword;
      },
    });
  };
}

function normalize({ name, email, password }) {
  return {
    Nname: upperFirst(name.trim()),
    Nemail: email.trim().toLowerCase(),
    Npassword: password.trim(),
  };
}
