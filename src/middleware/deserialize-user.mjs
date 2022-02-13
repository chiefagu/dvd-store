import config from "config";

export function makeDeserializeUser({ verifyJwt, reIssueAcessToken, logger }) {
  return async function deserializeUser(req, res, next) {
    const accessToken = getBearerAccessToken(req);

    const refreshToken = req.get("x-refresh-token");

    if (!accessToken) {
      logger.warn("missing access token");
      return res.status(400).json({ message: "missing access token" });
    }

    const { decoded, expired, valid } = verifyJwt({
      token: accessToken,
      secret: config.get("accessKey"),
    });

    if (!decoded) {
      logger.warn("invalid access token");
      return res.status(401).json({ message: "invalid access token" });
    }

    if (!valid && !refreshToken) {
      return res.status(401).json({ message: "expired token" });
    }

    if (refreshToken && expired) {
      let newAccessToken = await reIssueAcessToken(refreshToken);

      if (!newAccessToken) {
        return res.status(500).json({ message: "Something went wrong" });
      }

      const result = verifyJwt({
        token: newAccessToken,
        secret: config.get("accessKey"),
      });

      if (!result.valid) {
        return res.status(401).json({ mesage: "invalid token" });
      }

      req.setHeader("x-accessToken", newAccessToken);
      req.user = decoded;
      return next();
    }

    if (decoded) {
      req.user = decoded;
      return next();
    }
  };
}

function getBearerAccessToken(req) {
  return req.get("Authorization")?.replace(/Bearer\s/i, "");
}
