import { HistoryCuti } from "../api/v1/historyCuti/model.js";

export const getHistoryCuti = async (req) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows: requests, count: totalItems } =
      await HistoryCuti.findAndCountAll({
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: requests,
      page,
      limit,
      totalPages,
      totalItems,
    };
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};

export const getHistoryCutiByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { rows: requests, count: totalItems } =
      await HistoryCuti.findAndCountAll({
        where: { user_id: userId },
        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      data: requests,
      page,
      limit,
      totalPages,
      totalItems,
    };
  } catch (err) {
    res.status(err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: err.message || "Internal server error",
    });
  }
};
