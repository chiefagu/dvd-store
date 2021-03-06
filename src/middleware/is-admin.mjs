export function makeIsAdmin() {
  return function isAdmin(req, res, next) {
    if (!req?.user?.isAdmin) {
      return res.status(403).json({ message: "Can't perform this action" });
    }
    return next();
  };
}
