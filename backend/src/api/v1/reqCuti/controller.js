import { StatusCodes } from "http-status-codes";
import {
  createRequestCuti,
  getAllRequestCuti,
  getRequestCutiById,
  updateStatusRequestCuti,
  getRequestCutiByUser,
  updateRevisionRequestCuti,
} from "../../../services/reqCuti.js";

export const create = async (req, res, next) => {
  try {
    const result = await createRequestCuti(req);

    res.status(StatusCodes.CREATED).json({
      data: result,
    });
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};
export const getAll = async (req, res, next) => {
  try {
    const result = await getAllRequestCuti(req);

    res.status(StatusCodes.OK).json(result);
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await updateStatusRequestCuti(req, id);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await getRequestCutiById(req, id);

    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};

export const getByUser = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const result = await getRequestCutiByUser(req, userId);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};

export const updateRevision = async (req, res, next) => {
  console.log(req);
  try {
    const { id } = req.params;
    const result = await updateRevisionRequestCuti(req, id);
    res.status(StatusCodes.OK).json({
      data: result,
    });
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};
