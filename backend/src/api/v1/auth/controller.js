import { StatusCodes } from "http-status-codes";
import { signin } from "../../../services/auth.js";

export const signinUser = async (req, res, next) => {
  try {
    const result = await signin(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};
