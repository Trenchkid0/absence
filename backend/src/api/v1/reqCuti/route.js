import express from "express";
import {
  create,
  getAll,
  update,
  getById,
  getByUser,
  updateRevision,
} from "./controller.js";
import { authenticateUser } from "../../../middlewares/auth.js";
import { uploadMiddleware } from "../../../middlewares/multer.js";
import { authorizeRoles } from "../../../middlewares/auth.js";

const router = express.Router();

router.get("/cuti", authenticateUser, getAll);
router.post(
  "/cuti",
  authenticateUser,
  uploadMiddleware.single("attachment"),
  create
);
router.put("/cuti/:id", authenticateUser, authorizeRoles(2, 3), update); // 2 untuk head,3 untuk gm
router.get("/cuti/:id", authenticateUser, getById);
router.get("/cuti/user/:userId", authenticateUser, getByUser);
router.put(
  "/cuti/revision/:id",
  authenticateUser,
  uploadMiddleware.single("attachment"),
  authorizeRoles(1),
  updateRevision
);

export default router;
