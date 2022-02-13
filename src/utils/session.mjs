import config from "config";
import { verifyJwt, signJwt } from "./jwt.utils.mjs";
import { userDb } from "../user/data-access/index.mjs";

export async function reIssueAcessToken(refreshToken) {
  const decoded = verifyJwt({
    token: refreshToken,
    secret: config.get("refreshKey"),
  });

  if (!decoded) return !!decoded;

  const user = await userDb.findById(decoded._id);

  if (!user) return !!user;

  const payload = { _id: user._id };

  const newAccessToken = signJwt({
    payload,
    secret: config.get("accesskey"),
    options: { expiresIn: config.get("accessTokenTtl") },
  });

  return newAccessToken;
}
