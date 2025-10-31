import express from "express";
import { getAllHistoryCuti, getHistoryByUser } from "./controller.js";
import { authenticateUser, authorizeRoles } from "../../../middlewares/auth.js";

const router = express.Router();

router.get(
  "/historyCuti",
  authenticateUser,
  authorizeRoles(2, 3),
  getAllHistoryCuti
);

router.get(
  "/historyCuti/user/:userId",
  authenticateUser,
  authorizeRoles(1,2, 3),
  getHistoryByUser
);

export default router;
