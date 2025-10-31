import { where } from "sequelize";
import { RequestCuti } from "../api/v1/reqCuti/model.js";
import { BadRequestError } from "../errors/bad-request.js";
import { UnauthorizedError } from "../errors/unauthorized.js";
import { Users } from "../api/v1/users/model.js";
import { getRoleFromToken } from "../middlewares/auth.js";
import { HistoryCuti } from "../api/v1/historyCuti/model.js";
import { io } from "../../app.js";

export const createRequestCuti = async (req) => {
  const { employee_id, start_date, end_date, leave_type, reason } = req.body;

  if (!employee_id || !start_date || !end_date || !leave_type || !reason) {
    throw new BadRequestError("All fields except attachment are required");
  }

  const employee = await Users.findByPk(employee_id);
  if (!employee) {
    throw new UnauthorizedError("Invalid employee");
  }

  const attachment = req.file ? req.file.filename : null;

  const request = await RequestCuti.create({
    employee_id,
    start_date,
    end_date,
    leave_type,
    reason,

    attachment,
    current_approver_id: null,
    created_at: new Date(),
    updated_at: new Date(),
  });

  const createHistory = await HistoryCuti.create({
    role: "employee",
    action: "submit",
    comment: null,
    actor: req.user.username,
    req_cuti_id: request.id,
    user_id: employee_id,
  });

  await createHistory.save();

  await request.save();

  return request;
};

export const updateStatusRequestCuti = async (req, id) => {
  const { status, comment } = req.body;

  const request = await RequestCuti.findByPk(id);

  if (!request) {
    throw new BadRequestError("Request not found");
  }

  const infoUser = getRoleFromToken(req);

  //ketika head sudah approve maka gm yang bisa approve tetapi tidak bisa kembali ke head
  // if (request.current_approver_role > infoUser.role) {
  //   throw new UnauthorizedError(
  //     "You are not authorized to perform this action"
  //   );
  // }

  if (infoUser.role === 3 && (status === "approved" || status === "revision")) {
    request.status = status;
    request.current_approver_role = infoUser.role;
  } else if (
    infoUser.role === 2 &&
    (status === "approved" || status === "revision" || status === "rejected")
  ) {
    request.status = status === "approved" ? "pending_gm" : status;
    request.current_approver_role = infoUser.role;
  } else {
    throw new UnauthorizedError(
      "You are not authorized to perform this action"
    );
  }

  if (status === "revision") {
    io.sockets.sockets.forEach((socket, socketId) => {
      console.log(`Connected socket ID: ${socketId}, UserID: ${socket.userID}`);
      if (socket.userID === request.employee_id) {
        console.log(`📨 Sending notification to user ${socket.userID}`);
        socket.emit("cuti_revised", {
          message: `Pengajuan cuti #${request.id} kamu perlu revisi.`,
          req_cuti_id: request.id,
        });
      }
    });
  }

  const createHistory = await HistoryCuti.create({
    role: infoUser.role,
    action:
      status === "approved"
        ? "approve"
        : status === "revision"
        ? "revision"
        : "reject",
    comment: comment,
    req_cuti_id: request.id,
    user_id: request.employee_id,
    actor: req.user.username,
  });

  await createHistory.save();

  await request.save();
  return request;
};

export const getAllRequestCuti = async (req) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  const { rows: requests, count: totalItems } =
    await RequestCuti.findAndCountAll({
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
};

export const getRequestCutiById = async (req, id) => {
  const request = await RequestCuti.findByPk(id);
  if (!request) {
    throw new BadRequestError("Request not found");
  }
  return request;
};

export const getRequestCutiByUser = async (req, userId) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;
  const requests = await RequestCuti.findAll({
    where: {
      employee_id: userId,
    },
    limit,
    offset,
    order: [["createdAt", "DESC"]],
  });
  return requests;
};

export const updateRevisionRequestCuti = async (req, id) => {
  const { start_date, end_date, leave_type, reason } = req.body;

  const request = await RequestCuti.findByPk(id);

  if (!request) {
    throw new BadRequestError("Request not found");
  }
  if (request.status !== "revision") {
    throw new BadRequestError("Request is not in revision status");
  }

  request.start_date = start_date;
  request.end_date = end_date;
  request.leave_type = leave_type;
  request.reason = reason;

  await request.save();

  return request;
};
