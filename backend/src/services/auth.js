import { Users } from "../../src/api/v1/users/model.js";
import bcrypt from "bcryptjs";
import { createJWT } from "../utils/jwt.js";
import { createTokenUser } from "../utils/createTokenUser.js";
import { BadRequestError } from "../errors/bad-request.js";
import { UnauthorizedError } from "../errors/unauthorized.js";

export const signin = async (req) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new BadRequestError("Please provide username and password");
  }

  const result = await Users.findOne({ where: { username: username } });

  if (!result) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const isPasswordCorrect = await bcrypt.compare(password, result.password);

  if (!isPasswordCorrect) {
    throw new UnauthorizedError("Invalid Credentials");
  }

  const token = createJWT({ payload: createTokenUser(result) });

  return {
    userID: result.id,
    token: token,
    role_id: result.role_id,
    username: result.username,
  };
};
