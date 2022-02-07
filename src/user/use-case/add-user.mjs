import { makeUser } from "../index.mjs";

export function makeAddUser({ userDb, getHash, signJwt, config }) {
  return async function addUser(userInput) {
    const { getName, getPassword, getEmail } = makeUser(userInput);

    const exists = await userDb.findByEmail(getEmail());

    if (exists) {
      return exists;
    }

    const hashed = getHash(getPassword());

    const user = await userDb.insert({
      name: getName(),
      email: getEmail(),
      password: hashed,
    });

    const payload = {
      _id: user._id,
      email: user.email,
    };

    const accessToken = signJwt({
      payload,
      secret: config.get("accessKey"),
      options: { expiresIn: config.get("accessTokenTtl") },
    });

    const refreshToken = signJwt({
      payload,
      secret: config.get("refreshKey"),
      options: { expiresIn: config.get("refreshTokenTtl") },
    });

    return {
      accessToken,
      refreshToken,
    };
  };
}
