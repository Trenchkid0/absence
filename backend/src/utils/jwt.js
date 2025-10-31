import jwt from "jsonwebtoken";
import { jwtSecret, jwtExpiration } from "../config/config.js";

export const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, jwtSecret, {
    expiresIn: jwtExpiration,
  });
  return token;
};

export const isTokenValid = ({ token }) => jwt.verify(token, jwtSecret);
