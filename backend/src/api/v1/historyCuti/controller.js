import {
  getHistoryCuti,
  getHistoryCutiByUser,
} from "../../../services/history.js";
import { StatusCodes } from "http-status-codes";

export const getAllHistoryCuti = async (req, res, next) => {
  try {
    const requests = await getHistoryCuti(req);
    res.status(StatusCodes.OK).json(requests);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};

export const getHistoryByUser = async (req, res, next) => {
  try {
    const requests = await getHistoryCutiByUser(req);
    console.log(requests);
    res.status(StatusCodes.OK).json(requests);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};
