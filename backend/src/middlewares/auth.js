import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { UnauthenticatedError } from "../errors/unauthenticated.js";
import { isTokenValid } from "../utils/jwt.js";

export const authenticateUser = async (req, res, next) => {
  try {
    let token;

    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw new UnauthenticatedError("Authentication invalid");
    }

    const payload = isTokenValid({ token });

    req.user = {
      userID: payload.id,
      username: payload.username,
      role: payload.role,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user.role);
    if (!roles.includes(Number(req.user.role))) {
      throw new UnauthorizedError("Unauthorized to access this route");
    }
    next();
  };
};

export const getRoleFromToken = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthorizedError("Authentication invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return decoded;
  } catch (err) {
    throw new UnauthorizedError("Invalid or expired token");
  }
};

// module.exports = { authenticateUser, authorizeRoles };
