import { UnauthenticatedError } from "../utils/error.js";
import { verifyJWT } from "../utils/token.js";
export const authenticate_user = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) throw new UnauthenticatedError("authentication invalid");
  try {
    const { id } = verifyJWT(token);
    req.user = { id };
    next();
  } catch (err) {
    if (!token) throw new UnauthenticatedError("authentication invalid");
  }
};
